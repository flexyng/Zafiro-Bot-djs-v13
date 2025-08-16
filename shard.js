const { ShardingManager } = require("discord.js");
require("dotenv").config();

const shards = new ShardingManager('./index.js', {
    token: "OTI4NDExMzE4NTg5OTg4ODg0.Gp2rx.WoDO5Q-SZ8KnfVWosrhYKCRhehR_9XsnKYcrUI",
    totalShards: "auto"
});

shards.on('shardCreate', (shard) => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Iniciando shard #${shard.id}`)
});

shards.spawn(shards.totalShards, 10000)
