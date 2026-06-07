import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { Calendar } from 'lucide-react';
import Link from 'next/link';

async function getBlogPosts() {
  try {
    if (!db) {
      return [];
    }
    const blogRef = collection(db, 'blog');
    const q = query(blogRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Blog</h1>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-4 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Latest news, updates, and insights from Muaz Technology
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <Link href={`/blog/${post.id}`} key={post.id} className="group">
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  {/* Image Container - Fixed size, full image shown */}
                  <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                    {post.imageUrl ? (
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
                        <span className="text-4xl">📝</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.subtitle || post.content?.slice(0, 100) + '...' || 'Read more...'}
                      </p>
                    </div>
                    
                    {/* Meta info */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Calendar size={14} />
                        <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        }) : 'Recent'}</span>
                      </div>
                      <span className="text-xs font-medium text-blue-600 group-hover:underline">
                        Read More →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}