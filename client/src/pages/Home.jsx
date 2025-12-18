export const Home = () => {
  return (
    <section className="min-h-screen bg-gray-100 flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Text Section */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Organize your work with <span className="text-blue-600">KanbanFlow</span>
          </h1>

          <p className="text-gray-600 mb-6">
            A simple and powerful Kanban-style task manager to plan, track,
            and finish your work efficiently.
          </p>

          <div className="flex gap-4">
            <a
              href="/register"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              Get Started
            </a>
            <a
              href="/login"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded hover:bg-blue-50"
            >
              Login
            </a>
          </div>
        </div>

        {/* Image / Illustration */}
        <div className="hidden md:block">
          <img
            src="https://imgs.search.brave.com/4vVwFNNowpHlGazL3pDJjuNmoqffz736OGBx-bZNqFA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTIw/NjIzNDMyNS92ZWN0/b3Ivc2NydW0tbWFu/YWdlbWVudC1ib2Fy/ZC13b3JrZmxvdy1w/cm9qZWN0LW9uLXRh/YmxldC1wYy12ZWN0/b3ItaWxsdXN0cmF0/aW9uLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz16X0pJWHY3/YS16a21SYjRGWVhk/YnZCSFctdGVLLXpJ/TVY1Y3g3QkNxRHI4/PQ"
            alt="kanban"
            className="w-full rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
};
