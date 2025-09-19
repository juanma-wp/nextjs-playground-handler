import { NextResponse } from 'next/server';
import { getPlaygroundHandler } from 'wordpress-playground-handler';
import path from 'path';

// export const runtime = 'nodejs';
export const runtime = 'edge';

export async function GET() {
  try {
    const handler = await getPlaygroundHandler({
      blueprintPath: path.resolve(process.cwd(), 'wordpress/blueprint.json'),
      mountPaths: {
        // databasePath: path.resolve(process.cwd(), 'wordpress/database'),
        muPluginsPath: path.resolve(process.cwd(), 'wordpress/mu-plugins')
      }
    });
    
    const response = await handler.request({
      method: 'GET',
      url: '/wp-json/wp/v2/users'
    });

    if (response.httpStatusCode === 200) {
      const userData = JSON.parse(response.text);
      return NextResponse.json(userData);
    } else {
      return NextResponse.json(
        { error: `Failed to fetch users: ${response.httpStatusCode}` },
        { status: response.httpStatusCode }
      );
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: `Error fetching users: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}