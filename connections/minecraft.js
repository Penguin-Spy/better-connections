module.exports = (manager) => {
  powercord.api.connections.registerConnection({
    type: 'minecraft',
    name: 'Minecraft',
    color: '#70B237',
    _bc: true,
    icon: {
      darkSVG: `${manager.baseUrl}/minecraft.svg`,
      lightSVG: `${manager.baseUrl}/minecraft.svg`
    },
    enabled: true,
    fetchAccount: async (id) => {
      let accounts = [];
      try {
        accounts = await manager.cachedGet(`${manager.baseUrl}/api/connections/${id}`);
      } catch (e) {
        // Let it fail silently
      }
      return accounts.minecraft;
    },
    onDisconnect: async () => {
      window.open(`${manager.baseUrl}/api/link/delete?type=minecraft`);
    },
    onConnect: async () => {
      window.open(`${manager.baseUrl}/api/link/minecraft`);
    }
  });
  return 'minecraft';
};
