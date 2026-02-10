import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from './BlogDetail.module.css'
import { FaArrowLeft, FaCalendarAlt, FaTag } from 'react-icons/fa'

type BlogPost = {
  id: number
  title: string
  slug: string
  content: string
  date: string
  category: string
  image: string
  readTime: string
}

const blogPosts: BlogPost[] = [
  //php native
  {
    id: 1,
    title: 'Getting Started with Native PHP for Beginners',
    slug: 'getting-started-native-php',
    content: `
## Introduction

PHP is one of the most widely used backend programming languages for building dynamic websites.  
In this article, I share my first experience learning **Native PHP** and understanding its core fundamentals.

---

## Basic PHP Syntax

PHP files usually use the \`.php\` extension and are written inside special tags:

\`\`\`php
<?php
echo "Hello World!";
?>
\`\`\`

The **echo** command is used to display text or output to the browser.

---

## Variables in PHP

\`\`\`php
<?php
$name = "Naila";
echo "Hello, " . $name;
?>
\`\`\`

Variables in PHP start with a dollar sign \`$\` and can store different types of data such as strings, numbers, or arrays.

---

## Understanding CRUD Concept

During my first project, I learned the basic **CRUD** operations:

- **Create** – inserting new data  
- **Read** – displaying stored data  
- **Update** – editing existing data  
- **Delete** – removing data  

PHP is commonly combined with **MySQL** to manage and store this data.

---

## Conclusion

Learning Native PHP helps build a strong backend foundation before moving to frameworks like **Laravel**.  
It improves understanding of server logic, data processing, and database interaction.
`,
    date: '2026-02-10',
    category: 'Backend',
    image: 'https://picsum.photos/seed/phpnative/1200/600.jpg',
    readTime: '4 min read'
  },


  //restful api
  {
    id: 2,
    title: 'Understanding RESTful API in Web Development',
    slug: 'understanding-restful-api',
    content: `
## Introduction

A **RESTful API** (Representational State Transfer) is a standard way for applications to communicate with each other using **HTTP requests** and **JSON data**.

REST APIs are commonly used to connect **frontend** and **backend** systems in modern web development.

### HTTP Methods

Some common HTTP methods used in RESTful APIs:

- **GET** → Retrieve data
- **POST** → Create new data
- **PUT** → Update existing data
- **DELETE** → Remove data

### Simple PHP API Example

\`\`\`php
<?php
header("Content-Type: application/json");

$data = [
  "status" => "success",
  "message" => "Hello from REST API"
];

echo json_encode($data);
?>
\`\`\`

### Example JSON Response

\`\`\`json
{
  "status": "success",
  "message": "Hello from REST API"
}
\`\`\`

### Conclusion

RESTful APIs make web applications more **scalable**, **structured**, and **easy to integrate** across multiple platforms such as web, mobile, and IoT devices.
`,
    date: '2026-02-10',
    category: 'Backend',
    image: 'https://picsum.photos/seed/restapi/1200/600.jpg',
    readTime: '6 min read'
  },


  //laravel blade
  {
    id: 3,
    title: 'Building Dynamic Websites with Laravel Blade',
    slug: 'building-dynamic-websites-laravel-blade',
    content: `
## Introduction

**Laravel Blade** is a powerful templating engine that comes built-in with the Laravel framework.  
It allows developers to create **dynamic**, **clean**, and **reusable** user interfaces efficiently.

Blade makes it easier to separate **logic** and **presentation**, resulting in more maintainable code.

---

## Why Use Blade?

- Clean and readable syntax
- Layout inheritance
- Reusable components
- Secure data rendering
- Easy integration with Laravel controllers

---

## Basic Blade Layout Example

### layout.blade.php

\`\`\`php
<!DOCTYPE html>
<html>
<head>
  <title>@yield('title')</title>
</head>
<body>
  <header>
    <h1>My Website</h1>
  </header>

  <main>
    @yield('content')
  </main>

  <footer>
    <p>© 2026 My Website</p>
  </footer>
</body>
</html>
\`\`\`

---

## Child Page Example

### home.blade.php

\`\`\`php
@extends('layout')

@section('title', 'Home Page')

@section('content')
  <h2>Welcome, {{ $name }}</h2>
  <p>This page is rendered using Laravel Blade.</p>
@endsection
\`\`\`

---

## Controller Example

\`\`\`php
public function index() {
  return view('home', [
    'name' => 'Maulana'
  ]);
}
\`\`\`

---

## Conclusion

Laravel Blade helps developers build **structured**, **scalable**, and **maintainable** web applications.  
By using layouts and components, development becomes faster while keeping the code organized and secure.
`,
    date: '2026-02-10',
    category: 'Laravel',
    image: 'https://picsum.photos/seed/laravelblade/1200/600.jpg',
    readTime: '8 min read'
  },


  //oauth 
  {
    id: 4,
    title: 'Implementing OAuth Social Login (Google, Meta, X, Discord)',
    slug: 'implementing-oauth-social-login',
    content: `
## Introduction

**OAuth (Open Authorization)** is a modern authentication method that allows users to log in using third-party services such as **Google, Meta (Facebook), X (Twitter), and Discord** without creating a new account manually.

It improves **user experience**, **security**, and **login speed**.

---

## How OAuth Works

1. User clicks "Login with Google"
2. Redirect to Google Authorization Page
3. User grants permission
4. Google sends an Access Token back to your app
5. Your app retrieves user data (name, email, avatar)

---

## Benefits of OAuth

- Faster login process
- No password storage needed
- Higher security
- Trusted identity providers
- Better user retention

---

## Example Flow (React Frontend)

\`\`\`tsx
function LoginButton() {
  const handleLogin = () => {
    window.location.href =
      "http://localhost:8000/auth/google/redirect";
  };

  return <button onClick={handleLogin}>Login with Google</button>;
}
\`\`\`

---

## Example Backend (Laravel Socialite)

\`\`\`php
use Laravel\\Socialite\\Facades\\Socialite;

public function redirectToGoogle() {
  return Socialite::driver('google')->redirect();
}

public function handleGoogleCallback() {
  $user = Socialite::driver('google')->user();

  return $user->getEmail();
}
\`\`\`

---

## Supported Providers

- Google
- Meta (Facebook)
- X (Twitter)
- Discord
- GitHub
- Microsoft

---

## Conclusion

OAuth social login integration is an essential feature in modern applications.  
It provides a **secure**, **fast**, and **user-friendly authentication experience**, making it highly valuable for both developers and users.
`,
    date: '2026-02-10',
    category: 'Authentication',
    image: 'https://picsum.photos/seed/oauth/1200/600.jpg',
    readTime: '9 min read'
  },


  //ai dcgan
  {
    id: 5,
    title: 'Generating Anime Characters using DCGAN with TensorFlow & Keras',
    slug: 'anime-generator-dcgan-tensorflow-keras',
    content: `
## Introduction

In this project, I built an **Anime Character Generator** using **Deep Convolutional Generative Adversarial Network (DCGAN)** with **TensorFlow** and **Keras**.

The goal was to train a neural network to generate new anime faces from scratch based on a dataset.

---

## What is DCGAN?

**DCGAN (Deep Convolutional GAN)** is a type of neural network consisting of two models:

- **Generator** → Creates fake images
- **Discriminator** → Detects whether the image is real or fake

Both models compete until the generator produces realistic results.

---

## Tools & Technologies

- Python
- TensorFlow
- Keras
- NumPy
- Matplotlib
- Google Colab / GPU

---

## Dataset Preparation

The dataset contains thousands of anime face images.  
Images were resized and normalized before training.

---

## Generator Example

\`\`\`python
model = Sequential([
    Dense(256, input_dim=100),
    LeakyReLU(alpha=0.2),
    BatchNormalization(),
    Dense(512),
    LeakyReLU(alpha=0.2),
    Dense(784, activation='tanh'),
    Reshape((28,28,1))
])
\`\`\`

---

## Training Process

The training loop runs for several epochs:

- Generate fake images
- Compare with real images
- Update discriminator
- Update generator

Training may take hours depending on GPU power.

---

## Results

After training, the model can produce **unique anime faces** that never existed before.  
The longer the training, the better the quality.

---

## Challenges

- Long training time
- GPU memory limitation
- Mode collapse
- Dataset quality

---

## Conclusion

Building a DCGAN anime generator helped me understand **deep learning concepts**, **neural networks**, and **AI model training pipelines**.  
It was a challenging but rewarding experience that strengthened my skills in **Machine Learning and Python development**.
`,
    date: '2026-02-10',
    category: 'AI / Machine Learning',
    image: 'https://picsum.photos/seed/animegan/1200/600.jpg',
    readTime: '12 min read'
  },

  {
    id: 6,
    title: 'Getting Started with CodeIgniter 4 for Web Development',
    slug: 'getting-started-codeigniter-4',
    content: `
## Introduction

**CodeIgniter 4** is a lightweight PHP framework designed for building dynamic web applications quickly and efficiently.  
It follows the **MVC (Model–View–Controller)** pattern, making the code structured and maintainable.

---

## Why CodeIgniter 4?

- Lightweight and fast
- Easy configuration
- Clear MVC structure
- Built-in security features
- Suitable for small to medium projects

---

## Project Structure

CodeIgniter 4 separates logic into:

- **Model** → Database interaction
- **View** → User interface (HTML)
- **Controller** → Handles requests & responses

---

## Simple Route Example

\`\`\`php
// app/Config/Routes.php
$routes->get('/users', 'UserController::index');
\`\`\`

---

## Controller Example

\`\`\`php
namespace App\Controllers;

class UserController extends BaseController
{
    public function index()
    {
        return view('users/index');
    }
}
\`\`\`

---

## View Example

\`\`\`php
<!-- app/Views/users/index.php -->
<h1>User List</h1>
<p>Welcome to CodeIgniter 4 Application</p>
\`\`\`

---

## Basic CRUD Concept

In real projects, CodeIgniter is often used to create:

- User Management
- Inventory Systems
- Booking Systems
- REST API Services

---

## Conclusion

Learning **CodeIgniter 4** helped me understand PHP framework architecture, MVC patterns, and backend web development fundamentals.  
It is a great framework for developers who want speed, simplicity, and performance in PHP projects.
`,
    date: '2026-02-10',
    category: 'PHP',
    image: 'https://picsum.photos/seed/codeigniter4/1200/600.jpg',
    readTime: '8 min read'
  }







]

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate() // Digunakan untuk kembali ke history sebelumnya

  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className={styles.notFound}>
        <h2>Article not found</h2>
        {/* Tombol back darurat jika post tidak ada */}
        <button onClick={() => navigate(-1)} className={styles.backLink} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
          <FaArrowLeft /> Back
        </button>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <section className={styles.detailSection}>
      <div className={styles.container}>

        {/* Diubah dari <Link> ke <button> agar bisa navigate(-1).
          className tetap menggunakan styles.backLink agar tampilan sama persis.
          Ditambah sedikit style reset agar button tidak punya border/background default browser.
        */}
        <button
          onClick={() => navigate(-1)}
          className={styles.backLink}
          style={{
            border: 'none',
            background: 'none',
            padding: 0,
            fontFamily: 'inherit',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FaArrowLeft /> Back
        </button>

        <h1 className={styles.title}>{post.title}</h1>

        <div className={styles.meta}>
          <span>
            <FaTag /> {post.category}
          </span>
          <span>
            <FaCalendarAlt /> {formatDate(post.date)}
          </span>
          <span>{post.readTime}</span>
        </div>

        <img
          src={post.image}
          alt={post.title}
          className={styles.heroImage}
        />

        <div className={styles.content}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </section>
  )
}