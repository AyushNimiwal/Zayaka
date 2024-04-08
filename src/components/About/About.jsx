import React from 'react'
import bg from '../../Images/kitchenbg.jpg'
function About() {
  return (
    <div className='w-full h-full'>
      <section className="w-full h-96 relative flex justify-center items-center">
        <img src={bg} className='w-full h-96 absolute' />
        <div className="absolute mx-auto px-4 py-24 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl font-bold p-2 text-slate-500">Welcome to Zayaka's</h1>
          <p className="text-xl text-slate-500 mt-4">Discover delicious and easy-to-follow recipes for all occasions.</p>
        </div>
      </section>
      <section className="about py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 p-2">About Us</h2>
          <div className="flex-1">
              <p className="text-lg mb-4 text-justify">Welcome to Zayaka, your one-stop shop for delicious and accessible recipes! We're passionate about bringing people together through the joy of cooking and sharing food.
                Perhaps you've been cooking since childhood, inspired by family traditions.
                Maybe your travels around the world ignited a love for exploring new flavors.
                Or, you simply enjoy the creativity and satisfaction of creating a delicious meal from scratch.
                Whatever your reason, we believe that food has the power to connect us.
                Our Mission:
                Here at Zayaka, we're dedicated to providing you with:
                Easy-to-follow recipes: We break down recipes into clear instructions, ensuring success for cooks of all skill levels.
                A diverse range of dishes: From classic comfort food to exciting international flavors, we cater to all tastes and dietary needs.
                A sense of community: We encourage comments, questions, and recipe adaptations. Share your experiences and connect with fellow food enthusiasts!
                We believe everyone deserves to experience the joy of cooking. Whether you're a seasoned chef or a curious beginner, we invite you to explore our recipes, find inspiration, and create something delicious in your kitchen.</p>
          </div>
        </div>
      </section>
      <section className="contact py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 p-2">Get in Touch</h2>
          <p className="text-lg mb-4">Feel free to reach out to me with any questions, suggestions, or recipe requests.</p>
          <ul className="flex space-x-4">
            <li><a href="mailto:aknimiwal001@example.com" className="text-blue-500 hover:underline">aknimiwal001@example.com</a></li>
            <li><a href="https://www.instagram.com/_its_._aayush" className="text-blue-500 hover:underline">Instagram</a></li>
          </ul>
        </div>
      </section>

    </div>
  )
}

export default About