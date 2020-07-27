module.exports = {
	 	name: 'ping',
  	description: 'Ping!', 
  		execute(message, args) { 	
 Â Â Â  // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
Â Â Â  const m = await message.channel.send("Ping?");
Â Â Â  m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
Â  }
  	},
  };