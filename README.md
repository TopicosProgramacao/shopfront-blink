# 🛍️ Online Store - React & Ant Design

A modern e-commerce application built with React, TypeScript, Ant Design, and Tailwind CSS. This project integrates product management, client management, and shopping cart functionalities with a beautiful dark/light theme toggle.

---

## 📋 Table of Contents

- [Features](#-features)
- [Technologies](#-technologies)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Functionalities](#-functionalities)
- [API Integration](#-api-integration)

---

## ✨ Features

### 🏠 HomePage
- Displays top 5 products from Fake Store API
- Responsive product cards with images and prices
- Quick navigation to product details

### 🛒 Products Page
- Complete product listing with search functionality
- Add, edit, and delete products
- Product registration with form validation
- Shopping cart integration ("Buy" button)
- Data persistence using LocalStorage
- Edit drawer for updating product details
- Delete confirmation with Popconfirm

### 👥 Clients Page
- Client listing with table view
- Add new clients via modal
- Edit existing clients with drawer
- Delete clients with confirmation
- LocalStorage persistence
- Form validation

### 🛒 Shopping Cart
- Add/remove products
- View quantity and total price
- Clear cart functionality
- Checkout process with confirmation
- Persistent cart data (LocalStorage)
- Cart badge showing item count

### 🎨 Theme Support
- Light and dark mode toggle
- Consistent theming across all pages
- Ant Design integration with custom theme tokens
- Smooth theme transitions

---

## 🚀 Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Ant Design** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Additional UI components
- **React Router** - Client-side routing
- **React Context API** - State management (Cart)
- **LocalStorage** - Data persistence
- **Fake Store API** - Product data source

---

## 🏁 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to: http://localhost:8080
   ```

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx              # Navigation header with cart and theme toggle
│   ├── ProductCard.tsx         # Reusable product card component
│   └── ui/                     # shadcn/ui components
├── contexts/
│   └── CartContext.tsx         # Shopping cart state management
├── pages/
│   ├── Index.tsx               # Homepage (top 5 products)
│   ├── Products.tsx            # Product management page
│   ├── Clients.tsx             # Client management page
│   ├── Cart.tsx                # Shopping cart page
│   ├── Account.tsx             # User account page
│   └── NotFound.tsx            # 404 page
├── lib/
│   └── utils.ts                # Utility functions
├── App.tsx                     # Main app component with routing
├── main.tsx                    # Application entry point
└── index.css                   # Global styles and theme variables
```

---

## 🎯 Functionalities

### Product Management
- **List Products**: View all products in a responsive grid
- **Add Product**: Register new products with name, price, description, image
- **Edit Product**: Update existing product details via drawer
- **Delete Product**: Remove products with confirmation dialog
- **Search Products**: Filter products by name
- **Buy Product**: Add products to shopping cart

### Client Management
- **List Clients**: View all clients in a table
- **Add Client**: Register new clients with name, email, phone
- **Edit Client**: Update client information via drawer
- **Delete Client**: Remove clients with confirmation

### Shopping Cart
- **Add to Cart**: Add products from product listings
- **View Cart**: See all items with quantities and prices
- **Remove Items**: Delete individual products from cart
- **Clear Cart**: Empty entire cart
- **Checkout**: Complete purchase with confirmation modal
- **Cart Badge**: Real-time item count in header

### Theme Toggle
- **Light/Dark Mode**: Switch between themes
- **Persistent Theme**: Saves preference in LocalStorage
- **Consistent Styling**: All components adapt to theme

---

## 🌐 API Integration

This project uses the **Fake Store API** for product data:

- **Endpoint**: `https://fakestoreapi.com/products?limit=5`
- **Usage**: Fetches top 5 products for the homepage
- **Fallback**: Returns mock data if API is unavailable

---

## 💾 Data Persistence

All data is stored in **LocalStorage**:

- `products` - Product listings
- `clients` - Client information
- `cart` - Shopping cart items
- `theme` - Theme preference (dark/light)

---

## 🎨 Customization

### Theme Variables

Edit `src/index.css` to customize colors:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  /* ... more variables */
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* ... more variables */
}
```

### Ant Design Theme

Modify `src/App.tsx` ConfigProvider tokens to adjust Ant Design components.

---

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

---

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🔗 Links

- **Live Demo**: [Your deployment URL]
- **Lovable Project**: https://lovable.dev/projects/5e645da5-8271-4883-b49f-b85bc76f7789
- **Fake Store API**: https://fakestoreapi.com/

---

## 📞 Support

For issues or questions, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using React and Ant Design**
