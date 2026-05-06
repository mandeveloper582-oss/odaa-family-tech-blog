export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      <div className="text-center mb-12">
        <div className="inline-block p-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-6">
          <span className="text-5xl">🌳</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
          About ODAA FAMILY TECH
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Empowering families through technology and community
        </p>
      </div>
      
      <div className="prose dark:prose-invert max-w-none">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            ODAA TECH is a personal blog focused on expanding knowledge, inspiring youth, conducting extensive research and collecting valuable skills and expertise to pass on to the next generation. Our main goal is to show young people the right path, enhance their understanding and support them in becoming self-reliant and improving their lives.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">What We Do</h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li>✓ Share practical tech tips for modern families youth</li>
            <li>✓ Review family-friendly interprenership and leadership resources</li>
            <li>✓ Provide tutorials for  leadership skill levels</li>
            <li>✓ Create a safe space for family tech discussions</li>
            <li>✓ Highlight success stories from our community</li>
          </ul>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Whether you're a tech-savvy parent, a curious grandparent, or a young learner, 
            there's a place for you in the ODAA FAMILY TECH community.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Subscribe to our newsletter, follow us on social media, and never miss an update 
            on how to make technology work for youth.
          </p>
        </div>
      </div>
    </div>
  );
}