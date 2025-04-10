
# ScaleMailer

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm install

# Step 4: Set up environment variables in a .env.local file
# Create a file named .env.local in the project root with the following variables:
# VITE_SUPABASE_URL=your_supabase_project_url
# VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Supabase Configuration

This project uses Supabase as a backend. You'll need to:

1. Create a Supabase project at https://app.supabase.com
2. Get your project URL and anon key from the API settings page
3. Add them to your .env.local file as shown above

## How to contribute
Create a feature branch with "Feat-[feature name]"
Once development and testing complete, create a pull request against main branch
