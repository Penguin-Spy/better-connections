module.exports = (manager) => {
  powercord.api.connections.registerConnection({
    type: 'gitlab',
    name: 'GitLab',
    color: '#FC6D27',
    _bc: true,
    icon: {
      darkSVG: `${manager.baseUrl}/gitlab.svg`,
      lightSVG: `${manager.baseUrl}/gitlab.svg`
    },
    enabled: true,
    fetchAccount: async (id) => {
      let accounts = [];
      try {
        accounts = await manager.cachedGet(`${manager.baseUrl}/api/connections/${id}`);
      } catch (e) {
      // Let it fail silently
      }
      return accounts.gitlab;
    },
    getPlatformUserUrl: (account) => {
      const username = account.name;
      return `https://gitlab.com/${encodeURIComponent(username)}`;
    },
    onDisconnect: async () => {
      window.open(`${manager.baseUrl}/api/link/delete?type=gitlab`);
    },
    onConnect: async () => {
      window.open(`${manager.baseUrl}/api/link/gitlab`);
    }
  });
  return 'gitlab';
};
