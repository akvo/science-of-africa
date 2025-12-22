/**
 * Home Page Tests
 *
 * Example tests for Next.js page components.
 * Demonstrates testing server components and page structure.
 */

import { render, screen } from '@testing-library/react';

// Import the actual Home page component
// import Home from '@/app/page';

// For this example, we'll create a simplified version
const Home = () => (
  <main>
    <h1>Welcome to <span>Test Project</span></h1>
    <p>Professional full-stack application with Strapi CMS and Next.js</p>
    <div>
      <a href="http://localhost:1337/admin">Strapi Admin</a>
      <a href="http://localhost:5050">Database Admin</a>
      <a href="http://localhost:8025">Mail Server</a>
    </div>
    <div data-testid="features">
      <div>Strapi CMS</div>
      <div>Next.js</div>
      <div>PostgreSQL</div>
      <div>Mailpit</div>
    </div>
  </main>
);

describe('Home Page', () => {
  describe('Content', () => {
    it('renders the welcome heading', () => {
      render(<Home />);

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByText(/Welcome to/i)).toBeInTheDocument();
    });

    it('renders the description text', () => {
      render(<Home />);

      expect(
        screen.getByText(/Professional full-stack application/i)
      ).toBeInTheDocument();
    });
  });

  describe('Navigation Links', () => {
    it('renders Strapi Admin link', () => {
      render(<Home />);

      const link = screen.getByRole('link', { name: /Strapi Admin/i });
      expect(link).toHaveAttribute('href', 'http://localhost:1337/admin');
    });

    it('renders Database Admin link', () => {
      render(<Home />);

      const link = screen.getByRole('link', { name: /Database Admin/i });
      expect(link).toHaveAttribute('href', 'http://localhost:5050');
    });

    it('renders Mail Server link', () => {
      render(<Home />);

      const link = screen.getByRole('link', { name: /Mail Server/i });
      expect(link).toHaveAttribute('href', 'http://localhost:8025');
    });
  });

  describe('Features Section', () => {
    it('renders all technology features', () => {
      render(<Home />);

      const features = screen.getByTestId('features');
      expect(features).toBeInTheDocument();

      expect(screen.getByText('Strapi CMS')).toBeInTheDocument();
      expect(screen.getByText('Next.js')).toBeInTheDocument();
      expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
      expect(screen.getByText('Mailpit')).toBeInTheDocument();
    });
  });
});
