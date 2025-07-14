#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
// Import the function to register News API tools (will create this next)
import { registerNewsApiTools } from './tools/index.js';

const main = async () => {
  const server = new McpServer({
    name: 'mcp-newsapi',
    version: '1.0.0',
    description: 'MCP Server for accessing News API endpoints.',
    // Authentication will be handled within the tool handlers using the API key
  });

  // Register News API tools
  registerNewsApiTools(server);

  console.log('Starting MCP News API Server...');
  // Use Stdio transport to connect
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log(`Server "mcp-newsapi" connected via stdio.`);
};

main().catch((error) => {
  console.error('Failed to start MCP server:', error);
  process.exit(1);
});
