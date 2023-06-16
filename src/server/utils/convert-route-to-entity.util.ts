const mapping: Record<string, string> = {
  excavators: 'excavator',
  invitations: 'invitation',
  projects: 'project',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
