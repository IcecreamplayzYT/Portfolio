"""
Profile Tracking Cog for Discord Bot with Flask API Server
Tracks and stores Discord/Roblox profile data for portfolio display.
Updates profile picture and data every 2 days automatically.
Serves data via HTTP API at /api/profile

Setup:
1. pip install discord.py aiohttp flask flask-cors python-dotenv
2. Add this cog to your existing Discord bot OR run standalone
3. Set DISCORD_BOT_TOKEN in .env file
4. The bot will automatically update data every 2 days
5. API is served at http://your-ip:25566/api/profile

Commands:
- !profile - Manually update and display profile data
- !profiledata - Get raw JSON profile data
- !avatar - Get current avatar URLs
- !apiinfo - Display API endpoint information
"""

import discord
from discord.ext import commands, tasks
from discord import app_commands
import aiohttp
import json
import os
from datetime import datetime, timedelta
from typing import Optional
import asyncio
import threading
from flask import Flask, jsonify, request
from flask_cors import CORS

# ==================== CONFIGURATION ====================
# Update these with your IDs
DISCORD_USER_ID = 822804221425614903
ROBLOX_USER_ID = 1610763045
DATA_FILE = "profile_data.json"
UPDATE_INTERVAL_DAYS = 2
API_PORT = 25566
API_HOST = "0.0.0.0"
# ========================================================

# Flask app for API
api_app = Flask(__name__)
CORS(api_app, resources={
    r"/api/*": {
        "origins": "*",
        "methods": ["GET", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization", "X-Requested-With"]
    }
})


def get_profile_data():
    """Load profile data from JSON file for API."""
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, 'r') as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading profile data: {e}")
    
    # Return default data if file doesn't exist
    return {
        "last_update": datetime.now().isoformat(),
        "discord": {
            "user_id": str(DISCORD_USER_ID),
            "username": "Realice",
            "display_name": "David",
            "avatar_url": None,
            "status": "online",
            "custom_status": "Life to no Limits"
        },
        "roblox": {
            "user_id": ROBLOX_USER_ID,
            "username": "Realice",
            "display_name": "David",
            "avatar_url": None,
            "friends_count": 0,
            "followers_count": 0,
            "following_count": 0
        }
    }


@api_app.after_request
def after_request(response):
    """Add CORS headers to all responses."""
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With')
    response.headers.add('Access-Control-Allow-Methods', 'GET,OPTIONS')
    response.headers.add('Cache-Control', 'public, max-age=300')  # Cache for 5 minutes
    return response


@api_app.route('/api/profile', methods=['GET', 'OPTIONS'])
def profile_endpoint():
    """API endpoint to get full profile data."""
    if request.method == 'OPTIONS':
        return '', 204
    
    data = get_profile_data()
    print(f"[API] Serving profile data - Last update: {data.get('last_update', 'never')}")
    return jsonify(data)


@api_app.route('/api/profile/discord', methods=['GET', 'OPTIONS'])
def discord_endpoint():
    """API endpoint to get Discord data only."""
    if request.method == 'OPTIONS':
        return '', 204
    
    data = get_profile_data()
    return jsonify(data.get("discord", {}))


@api_app.route('/api/profile/roblox', methods=['GET', 'OPTIONS'])
def roblox_endpoint():
    """API endpoint to get Roblox data only."""
    if request.method == 'OPTIONS':
        return '', 204
    
    data = get_profile_data()
    return jsonify(data.get("roblox", {}))


@api_app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        "status": "ok",
        "timestamp": datetime.now().isoformat(),
        "discord_user_id": DISCORD_USER_ID,
        "roblox_user_id": ROBLOX_USER_ID
    })


@api_app.route('/', methods=['GET'])
def root():
    """Root endpoint with API info."""
    return jsonify({
        "name": "Profile API",
        "version": "1.0.0",
        "endpoints": {
            "profile": "/api/profile",
            "discord": "/api/profile/discord",
            "roblox": "/api/profile/roblox",
            "health": "/api/health"
        }
    })


def run_flask():
    """Run Flask server in a separate thread."""
    print(f"[API] Starting Flask server on {API_HOST}:{API_PORT}")
    api_app.run(host=API_HOST, port=API_PORT, debug=False, use_reloader=False, threaded=True)


class ProfileCog(commands.Cog):
    """Cog to track and update profile data for portfolio display."""
    
    def __init__(self, bot: commands.Bot):
        self.bot = bot
        self.session: Optional[aiohttp.ClientSession] = None
        self.profile_data = self.load_data()
        
        # Start Flask API server in a separate thread
        self.api_thread = threading.Thread(target=run_flask, daemon=True)
        self.api_thread.start()
        print(f"[ProfileCog] API server started at http://{API_HOST}:{API_PORT}/api/profile")
        
        # Start auto-update task
        self.auto_update.start()
    
    def cog_unload(self):
        self.auto_update.cancel()
        if self.session:
            asyncio.create_task(self.session.close())
    
    def load_data(self) -> dict:
        """Load profile data from JSON file."""
        if os.path.exists(DATA_FILE):
            try:
                with open(DATA_FILE, 'r') as f:
                    return json.load(f)
            except Exception as e:
                print(f"[ProfileCog] Error loading data: {e}")
        return {
            "last_update": None,
            "discord": {},
            "roblox": {}
        }
    
    def save_data(self):
        """Save profile data to JSON file."""
        try:
            with open(DATA_FILE, 'w') as f:
                json.dump(self.profile_data, f, indent=2, default=str)
            print(f"[ProfileCog] Data saved to {DATA_FILE}")
        except Exception as e:
            print(f"[ProfileCog] Error saving data: {e}")
    
    async def get_session(self) -> aiohttp.ClientSession:
        """Get or create aiohttp session."""
        if self.session is None or self.session.closed:
            self.session = aiohttp.ClientSession()
        return self.session
    
    async def fetch_discord_data(self) -> dict:
        """Fetch Discord user data."""
        try:
            user = await self.bot.fetch_user(DISCORD_USER_ID)
            
            # Get avatar URL (animated if available)
            avatar_url = str(user.display_avatar.url)
            
            data = {
                "user_id": str(user.id),
                "username": user.name,
                "display_name": user.display_name or user.name,
                "avatar_url": avatar_url,
                "avatar_hash": user.display_avatar.key if user.display_avatar else None,
                "discriminator": user.discriminator,
                "is_bot": user.bot,
                "created_at": str(user.created_at),
                "public_flags": user.public_flags.value if user.public_flags else 0,
                "banner_url": str(user.banner.url) if user.banner else None,
                "accent_color": str(user.accent_color) if user.accent_color else None,
                "status": "online",
                "custom_status": None
            }
            
            # Try to get presence/status if in a shared guild
            for guild in self.bot.guilds:
                member = guild.get_member(DISCORD_USER_ID)
                if member:
                    data["status"] = str(member.status)
                    data["activity"] = str(member.activity) if member.activity else None
                    if member.activity and isinstance(member.activity, discord.CustomActivity):
                        data["custom_status"] = member.activity.name
                    break
            
            print(f"[ProfileCog] Discord data fetched: {data['display_name']} (@{data['username']})")
            return data
        except Exception as e:
            print(f"[ProfileCog] Error fetching Discord data: {e}")
            return {
                "user_id": str(DISCORD_USER_ID),
                "username": "Realice",
                "display_name": "David",
                "status": "online",
                "custom_status": "Life to no Limits"
            }
    
    async def fetch_roblox_data(self) -> dict:
        """Fetch Roblox user data using Roblox API with OpenCloud thumbnail."""
        session = await self.get_session()
        
        try:
            # Fetch basic user info
            async with session.get(
                f"https://users.roblox.com/v1/users/{ROBLOX_USER_ID}"
            ) as resp:
                if resp.status == 200:
                    user_data = await resp.json()
                    print(f"[ProfileCog] Roblox user data: {user_data}")
                else:
                    print(f"[ProfileCog] Failed to fetch Roblox user: {resp.status}")
                    return self._default_roblox_data()
            
            # Fetch avatar using Roblox Thumbnails API (420x420 for best quality)
            async with session.get(
                f"https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds={ROBLOX_USER_ID}&size=420x420&format=Png&isCircular=false"
            ) as resp:
                avatar_url = None
                if resp.status == 200:
                    avatar_data = await resp.json()
                    avatar_url = avatar_data.get("data", [{}])[0].get("imageUrl", "")
                    print(f"[ProfileCog] Roblox avatar URL: {avatar_url}")
            
            # Fetch friend count
            async with session.get(
                f"https://friends.roblox.com/v1/users/{ROBLOX_USER_ID}/friends/count"
            ) as resp:
                friends_count = 0
                if resp.status == 200:
                    friends_data = await resp.json()
                    friends_count = friends_data.get("count", 0)
            
            # Fetch follower count
            async with session.get(
                f"https://friends.roblox.com/v1/users/{ROBLOX_USER_ID}/followers/count"
            ) as resp:
                followers_count = 0
                if resp.status == 200:
                    followers_data = await resp.json()
                    followers_count = followers_data.get("count", 0)
            
            # Fetch following count
            async with session.get(
                f"https://friends.roblox.com/v1/users/{ROBLOX_USER_ID}/followings/count"
            ) as resp:
                following_count = 0
                if resp.status == 200:
                    following_data = await resp.json()
                    following_count = following_data.get("count", 0)
            
            result = {
                "user_id": ROBLOX_USER_ID,
                "username": user_data.get("name", ""),
                "display_name": user_data.get("displayName", ""),
                "description": user_data.get("description", ""),
                "is_banned": user_data.get("isBanned", False),
                "created_at": user_data.get("created", ""),
                "avatar_url": avatar_url,
                "friends_count": friends_count,
                "followers_count": followers_count,
                "following_count": following_count,
            }
            
            print(f"[ProfileCog] Roblox data fetched: {result['display_name']} (@{result['username']})")
            return result
            
        except Exception as e:
            print(f"[ProfileCog] Error fetching Roblox data: {e}")
            return self._default_roblox_data()
    
    def _default_roblox_data(self) -> dict:
        """Return default Roblox data."""
        return {
            "user_id": ROBLOX_USER_ID,
            "username": "Realice",
            "display_name": "David",
            "avatar_url": f"https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds={ROBLOX_USER_ID}&size=420x420&format=Png",
            "friends_count": 0,
            "followers_count": 0,
            "following_count": 0
        }
    
    async def update_all_data(self) -> dict:
        """Update all profile data from Discord and Roblox."""
        print(f"[ProfileCog] ========== Updating profile data at {datetime.now()} ==========")
        
        discord_data = await self.fetch_discord_data()
        roblox_data = await self.fetch_roblox_data()
        
        self.profile_data = {
            "last_update": datetime.now().isoformat(),
            "discord": discord_data,
            "roblox": roblox_data,
        }
        
        self.save_data()
        print(f"[ProfileCog] ========== Profile data updated successfully ==========")
        print(f"[ProfileCog] API endpoint: http://209.74.83.91:{API_PORT}/api/profile")
        
        return self.profile_data
    
    def needs_update(self) -> bool:
        """Check if data needs updating (older than 2 days)."""
        if not self.profile_data.get("last_update"):
            return True
        
        try:
            last_update = datetime.fromisoformat(self.profile_data["last_update"])
            return datetime.now() - last_update > timedelta(days=UPDATE_INTERVAL_DAYS)
        except:
            return True
    
    @tasks.loop(hours=12)  # Check every 12 hours
    async def auto_update(self):
        """Automatically update data if older than 2 days."""
        await self.bot.wait_until_ready()
        
        if self.needs_update():
            await self.update_all_data()
    
    @auto_update.before_loop
    async def before_auto_update(self):
        await self.bot.wait_until_ready()
        # Do initial update on startup
        print("[ProfileCog] Running initial data update...")
        await self.update_all_data()
    
    # ==================== COMMANDS ====================
    
    @commands.hybrid_command(name="profile", description="Update and display profile data")
    async def profile(self, ctx: commands.Context):
        """Manually trigger a profile data update."""
        await ctx.defer()
        
        embed = discord.Embed(
            title="🔄 Updating Profile Data...",
            color=discord.Color.purple()
        )
        msg = await ctx.send(embed=embed)
        
        data = await self.update_all_data()
        
        # Build response embed
        embed = discord.Embed(
            title="✅ Profile Data Updated",
            description=f"**Last update:** {data['last_update']}\n\n**API Endpoint:**\n`http://209.74.83.91:{API_PORT}/api/profile`",
            color=discord.Color.green()
        )
        
        # Discord section
        if data.get("discord"):
            d = data["discord"]
            embed.add_field(
                name="🎮 Discord",
                value=f"**{d.get('display_name', 'N/A')}**\n@{d.get('username', 'N/A')}\nStatus: {d.get('status', 'Unknown')}",
                inline=True
            )
            if d.get("avatar_url"):
                embed.set_thumbnail(url=d["avatar_url"])
        
        # Roblox section
        if data.get("roblox"):
            r = data["roblox"]
            embed.add_field(
                name="🎲 Roblox",
                value=f"**{r.get('display_name', 'N/A')}**\n@{r.get('username', 'N/A')}\n👥 {r.get('friends_count', 0)} friends\n❤️ {r.get('followers_count', 0)} followers",
                inline=True
            )
        
        embed.set_footer(text=f"Auto-updates every {UPDATE_INTERVAL_DAYS} days | API on port {API_PORT}")
        
        await msg.edit(embed=embed)
    
    @commands.hybrid_command(name="profiledata", description="Get raw profile data as JSON")
    async def profiledata(self, ctx: commands.Context):
        """Get the raw JSON profile data."""
        data = self.load_data()
        
        # Format as code block
        json_str = json.dumps(data, indent=2, default=str)
        
        if len(json_str) > 1900:
            # Send as file if too long
            with open("temp_profile.json", "w") as f:
                f.write(json_str)
            await ctx.send("📄 Profile data:", file=discord.File("temp_profile.json"))
            os.remove("temp_profile.json")
        else:
            await ctx.send(f"```json\n{json_str}\n```")
    
    @commands.hybrid_command(name="avatar", description="Get current avatar URLs")
    async def avatar(self, ctx: commands.Context):
        """Get current avatar URLs for use in portfolio."""
        data = await self.update_all_data()
        
        embed = discord.Embed(title="🖼️ Avatar URLs", color=discord.Color.purple())
        
        if data.get("discord", {}).get("avatar_url"):
            embed.add_field(
                name="Discord Avatar",
                value=f"```{data['discord']['avatar_url']}```",
                inline=False
            )
            embed.set_thumbnail(url=data["discord"]["avatar_url"])
        
        if data.get("roblox", {}).get("avatar_url"):
            embed.add_field(
                name="Roblox Avatar",
                value=f"```{data['roblox']['avatar_url']}```",
                inline=False
            )
        
        embed.set_footer(text="Use these URLs in your portfolio for current avatars")
        await ctx.send(embed=embed)
    
    @commands.hybrid_command(name="apiinfo", description="Get API endpoint information")
    async def apiinfo(self, ctx: commands.Context):
        """Display API endpoint information."""
        embed = discord.Embed(
            title="🌐 Profile API Information",
            description="Your profile data is being served via HTTP API.",
            color=discord.Color.blue()
        )
        
        embed.add_field(
            name="📍 Main Endpoint",
            value=f"```http://209.74.83.91:{API_PORT}/api/profile```",
            inline=False
        )
        embed.add_field(
            name="🎮 Discord Only",
            value=f"`/api/profile/discord`",
            inline=True
        )
        embed.add_field(
            name="🎲 Roblox Only",
            value=f"`/api/profile/roblox`",
            inline=True
        )
        embed.add_field(
            name="💓 Health Check",
            value=f"`/api/health`",
            inline=True
        )
        
        embed.add_field(
            name="📖 Usage",
            value="```javascript\nfetch('http://209.74.83.91:25566/api/profile')\n  .then(res => res.json())\n  .then(data => console.log(data));\n```",
            inline=False
        )
        
        embed.set_footer(text=f"Server running on port {API_PORT} | Data updates every {UPDATE_INTERVAL_DAYS} days")
        await ctx.send(embed=embed)
    
    @commands.hybrid_command(name="forceupdate", description="Force update profile data immediately")
    async def forceupdate(self, ctx: commands.Context):
        """Force an immediate update of profile data."""
        await ctx.defer()
        
        embed = discord.Embed(
            title="⚡ Force Updating...",
            description="Fetching latest data from Discord and Roblox APIs",
            color=discord.Color.orange()
        )
        msg = await ctx.send(embed=embed)
        
        data = await self.update_all_data()
        
        embed = discord.Embed(
            title="✅ Force Update Complete",
            description=f"Profile data has been refreshed.\n\n**Timestamp:** {data['last_update']}",
            color=discord.Color.green()
        )
        
        if data.get("discord", {}).get("avatar_url"):
            embed.set_thumbnail(url=data["discord"]["avatar_url"])
        
        await msg.edit(embed=embed)


async def setup(bot: commands.Bot):
    """Setup function for loading the cog."""
    await bot.add_cog(ProfileCog(bot))
    print("[ProfileCog] Cog loaded successfully")


# ==================== STANDALONE USAGE ====================
# Run this file directly to start the bot

if __name__ == "__main__":
    from dotenv import load_dotenv
    
    load_dotenv()
    
    print("=" * 50)
    print("Profile Bot + API Server")
    print("=" * 50)
    print(f"Discord User ID: {DISCORD_USER_ID}")
    print(f"Roblox User ID: {ROBLOX_USER_ID}")
    print(f"API Port: {API_PORT}")
    print("=" * 50)
    
    intents = discord.Intents.default()
    intents.members = True
    intents.presences = True
    intents.message_content = True
    
    bot = commands.Bot(command_prefix="!", intents=intents)
    
    @bot.event
    async def on_ready():
        print(f"\n✅ Logged in as {bot.user}")
        print(f"📊 Connected to {len(bot.guilds)} guilds")
        
        await bot.add_cog(ProfileCog(bot))
        
        try:
            synced = await bot.tree.sync()
            print(f"🔄 Synced {len(synced)} slash commands")
        except Exception as e:
            print(f"❌ Error syncing commands: {e}")
        
        print("\n" + "=" * 50)
        print("🌐 API Endpoints:")
        print(f"   http://209.74.83.91:{API_PORT}/api/profile")
        print(f"   http://209.74.83.91:{API_PORT}/api/profile/discord")
        print(f"   http://209.74.83.91:{API_PORT}/api/profile/roblox")
        print(f"   http://209.74.83.91:{API_PORT}/api/health")
        print("=" * 50)
    
    # Get token from environment variable
    token = os.getenv("DISCORD_BOT_TOKEN")
    if token:
        bot.run(token)
    else:
        print("\n❌ Error: DISCORD_BOT_TOKEN not found in environment variables")
        print("Create a .env file with: DISCORD_BOT_TOKEN=your_token_here")
