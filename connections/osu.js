module.exports = (manager) => {
    powercord.api.connections.registerConnection({
      type: 'osu',
      name: 'osu!',
      color: '#FF66AA',
      _bc: true,
      icon: {
        darkSVG: `${manager.baseUrl}/osu.svg`,
        lightSVG: `${manager.baseUrl}/osu.svg`
      },
      enabled: true,
      fetchAccount: async (id) => {
        let accounts = [];
        try {
          accounts = await manager.cachedGet(`${manager.baseUrl}/api/connections/${id}`);
        } catch (e) {
        // Let it fail silently
        }
        return accounts.osu;
      },
      getPlatformUserUrl: (account) => {
        const username = account.id;
        return `https://osu.ppy.sh/users/${encodeURIComponent(username)}`;
      },
      onDisconnect: async () => {
        window.open(`${manager.baseUrl}/api/link/delete?type=osu`);
      },
      onConnect: async () => {
        window.open(`${manager.baseUrl}/api/link/osu`);
      }
    });
    return 'osu';
  };
  