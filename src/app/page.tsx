"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Clock,
  MapPin,
  Star,
  Users,
  Gamepad2,
  Music,
  Coffee,
  Calendar,
  Phone,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Facebook,
  Twitter,
  Sparkles,
  Crown,
  Trophy,
} from "lucide-react"

const testimonials = [
  {
    name: "Ahmed Benali",
    rating: 5,
    text: "The most luxurious billiard experience in Morocco! The atmosphere is incredible and the tables are professional quality.",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Fatima El Mansouri",
    rating: 5,
    text: "Perfect place for a night out with friends. Great music, excellent service, and the best billiard tables in the city.",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Omar Ziani",
    rating: 5,
    text: "I've been coming here for months. The staff is amazing and the atmosphere is always vibrant. Highly recommended!",
    image: "/placeholder.svg?height=60&width=60",
  },
]

const galleryImages = [
  "/images/c1.jpg",
  "/images/c8.jpg",
  "/images/c6.jpg",
  "/images/c7.jpg",
  "/images/n2.jpg",
  "/images/c5.jpg",
]

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-400/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, -100, null],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

export default function BilliardHallLanding() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const nextGalleryImage = () => {
    setCurrentGalleryImage((prev) => (prev + 1) % galleryImages.length)
  }

  const prevGalleryImage = () => {
    setCurrentGalleryImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 215, 0, 0.15) 0%, transparent 50%)`,
          transition: 'background-image 0.3s ease',
        }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,215,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Floating WhatsApp Button with enhanced animation */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 2, type: "spring", damping: 10 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-30 animate-pulse" />
          <Button
            size="lg"
            className="relative rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white shadow-2xl shadow-green-500/50 h-16 w-16 p-0 border-2 border-green-400/50"
            onClick={() => window.open("https://wa.me/212XXXXXXXXX", "_blank")}
          >
            <Phone className="h-6 w-6" />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-green-400"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </Button>
        </div>
      </motion.div>

      {/* Hero Section with enhanced effects */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <FloatingParticles />
        
        {/* Dynamic background overlay */}
        <motion.div 
          className="absolute inset-0 z-0" 
          style={{ y }}
        >
          <img
            src="/images/word-image-93627-1.jpeg.webp"
            alt="Luxury Billiard Hall"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90" />
          <div 
            className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-green-400/10"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x * 0.1}% ${mousePosition.y * 0.1}%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)`
            }}
          />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, type: "spring", damping: 20 }}
          >
            <motion.div
              className="flex justify-center mb-6"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
            >
              <Crown className="h-16 w-16 text-yellow-400 mr-4" />
              <Sparkles className="h-12 w-12 text-yellow-300 mt-2" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent relative">
              Experience the Art of the Game
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 blur-2xl"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              Morocco&apos;s most luxurious billiard destination. Where precision meets passion in an atmosphere of pure
              elegance.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              <Button
                size="lg"
                className="relative bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-black font-bold text-lg px-8 py-4 rounded-full shadow-2xl shadow-yellow-500/50 transform hover:scale-105 transition-all duration-300 border-2 border-yellow-300/50 overflow-hidden group"
                onClick={() => window.open("https://wa.me/212XXXXXXXXX", "_blank")}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Book a Table Now on WhatsApp
                </span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="relative">
            <div className="w-6 h-10 border-2 border-yellow-400 rounded-full flex justify-center backdrop-blur-sm bg-black/20">
              <motion.div 
                className="w-1 h-3 bg-yellow-400 rounded-full mt-2"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <motion.div
              className="absolute inset-0 border-2 border-yellow-400/50 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </div>
        </motion.div>
      </section>

      {/* About Section with enhanced cards */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              className="flex justify-center mb-6"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              viewport={{ once: true }}
            >
              <Trophy className="h-12 w-12 text-yellow-400" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-400 relative">
              Where Legends Are Made
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 1 }}
                viewport={{ once: true }}
              />
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Step into Morocco&apos;s premier billiard destination. Our hall combines the timeless elegance of the game with
              modern luxury, creating an atmosphere that&apos;s both sophisticated and welcoming.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Gamepad2, title: "Premium Tables", desc: "Professional tournament-quality billiard tables", color: "from-green-500/20 to-green-600/10" },
              { icon: Music, title: "Curated Ambiance", desc: "Carefully selected music to enhance your game", color: "from-yellow-500/20 to-yellow-600/10" },
              { icon: Coffee, title: "Premium Drinks", desc: "Extensive selection of beverages and refreshments", color: "from-green-400/20 to-green-500/10" },
              { icon: Users, title: "Social Atmosphere", desc: "Perfect for friends, dates, and celebrations", color: "from-yellow-400/20 to-yellow-500/10" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group perspective-1000"
              >
                <motion.div
                  className={`relative bg-gradient-to-br from-green-900/50 to-green-800/30 p-6 rounded-2xl border border-green-700/30 hover:border-yellow-400/50 transition-all duration-500 group-hover:transform group-hover:scale-105 group-hover:-translate-y-2 backdrop-blur-sm overflow-hidden`}
                  whileHover={{ rotateY: 5, rotateX: 5 }}
                >
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
                  
                  {/* Floating icon with glow */}
                  <motion.div
                    className="relative"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <feature.icon className="relative h-12 w-12 text-yellow-400 mx-auto mb-4 z-10" />
                  </motion.div>
                  
                  <h3 className="relative text-xl font-bold mb-2 text-white z-10">{feature.title}</h3>
                  <p className="relative text-gray-400 group-hover:text-gray-300 transition-colors z-10">{feature.desc}</p>
                  
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Gallery Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black via-green-950/10 to-black relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-400">Experience the Atmosphere</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Take a glimpse into our world of luxury and precision
            </p>
          </motion.div>

          <div className="relative">
            <motion.div 
              className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden border-2 border-yellow-400/30 shadow-2xl shadow-yellow-400/20"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentGalleryImage}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <img
                    src={galleryImages[currentGalleryImage] || "/placeholder.svg"}
                    alt={`Gallery image ${currentGalleryImage + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <Button
  variant="outline"
  size="icon"
  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/70 border-yellow-400/50 hover:bg-yellow-400/20 backdrop-blur-sm z-10 hover:scale-110 active:scale-90 transition-transform duration-200"
  onClick={prevGalleryImage}
>
  <ChevronLeft className="h-6 w-6 text-yellow-400" />
</Button>

<Button
  variant="outline"
  size="icon"
  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/70 border-yellow-400/50 hover:bg-yellow-400/20 backdrop-blur-sm z-10 hover:scale-110 active:scale-90 transition-transform duration-200"
  onClick={nextGalleryImage}
>
  <ChevronRight className="h-6 w-6 text-yellow-400" />
</Button>

            <div className="flex justify-center mt-6 space-x-2">
              {galleryImages.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentGalleryImage ? "bg-yellow-400 scale-125" : "bg-gray-600"
                  }`}
                  onClick={() => setCurrentGalleryImage(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Pricing Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-400">Pricing & Special Offers</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Competitive rates with exclusive deals for every occasion
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Regular Hours",
                price: "150 DH",
                period: "per hour",
                features: ["Premium table access", "Complimentary setup", "Background music"],
                popular: false,
              },
              {
                title: "Happy Hour",
                price: "100 DH",
                period: "per hour",
                features: ["4PM - 7PM daily", "Free soft drink", "Premium table access", "Group discounts"],
                popular: true,
                badge: "Most Popular",
              },
              {
                title: "Students Night",
                price: "80 DH",
                period: "per hour",
                features: ["Wednesdays only", "Valid student ID required", "Free snacks", "Extended hours"],
                popular: false,
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, rotateY: 5 }}
              >
                <Card
                  className={`relative bg-gradient-to-br from-green-900/40 to-green-800/20 border-2 ${
                    plan.popular ? "border-yellow-400 shadow-2xl shadow-yellow-400/20" : "border-green-700/30"
                  } hover:border-yellow-400/70 transition-all duration-500 transform hover:scale-105 backdrop-blur-sm overflow-hidden group`}
                >
                  {plan.popular && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      viewport={{ once: true }}
                    >
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold shadow-lg">
                        {plan.badge}
                      </Badge>
                    </motion.div>
                  )}
                  
                  {/* Glow effect for popular plan */}
                  {plan.popular && (
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  )}
                  
                  <CardContent className="p-8 text-center relative z-10">
                    <h3 className="text-2xl font-bold mb-4 text-white">{plan.title}</h3>
                    <motion.div 
                      className="mb-6"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span className="text-4xl font-bold text-yellow-400 relative">
                        {plan.price}
                        <motion.div
                          className="absolute inset-0 bg-yellow-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </span>
                      <span className="text-gray-400 ml-2">{plan.period}</span>
                    </motion.div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={featureIndex} 
                          className="flex items-center justify-center text-gray-300"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <Star className="h-4 w-4 text-yellow-400 mr-2 flex-shrink-0" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                    <Button
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-black font-bold relative overflow-hidden group/btn"
                      onClick={() => window.open("https://wa.me/212XXXXXXXXX", "_blank")}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                      />
                      <span className="relative">Book Now</span>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-green-950/20 via-black to-green-950/20 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-400">What Our Players Say</h2>
            <p className="text-xl text-gray-300">Don&apos;t just take our word for it</p>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100, rotateY: 15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -100, rotateY: -15 }}
                transition={{ duration: 0.7 }}
                className="bg-gradient-to-br from-green-900/40 to-green-800/20 p-8 rounded-2xl border border-green-700/30 text-center backdrop-blur-sm relative overflow-hidden group"
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-transparent to-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <motion.div 
                  className="flex justify-center mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                    >
                      <Star className="h-6 w-6 text-yellow-400 fill-current mx-1" />
                    </motion.div>
                  ))}
                </motion.div>
                
                <motion.p 
                  className="text-xl text-gray-300 mb-6 italic relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  &quot;{testimonials[currentTestimonial].text}&quot;
                </motion.p>
                
                <motion.div 
                  className="flex items-center justify-center relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="w-15 h-15 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mr-4 flex items-center justify-center text-black font-bold text-xl">
                    {testimonials[currentTestimonial].name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-gray-400">Verified Customer</p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? "bg-yellow-400 scale-125" : "bg-gray-600"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Hours & Location Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-400">Visit Us Today</h2>
            <p className="text-xl text-gray-300">We&apos;re open late and ready to welcome you</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, rotateY: 2 }}
              className="bg-gradient-to-br from-green-900/40 to-green-800/20 p-8 rounded-2xl border border-green-700/30 backdrop-blur-sm relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-transparent to-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <motion.div 
                className="flex items-center mb-6 relative z-10"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative">
                  <Clock className="h-8 w-8 text-yellow-400 mr-4" />
                  <motion.div
                    className="absolute inset-0 bg-yellow-400/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white">Opening Hours</h3>
              </motion.div>
              
              <div className="space-y-3 text-lg relative z-10">
                {[
                  { days: "Monday - Thursday", hours: "2:00 PM - 2:00 AM" },
                  { days: "Friday - Saturday", hours: "2:00 PM - 3:00 AM" },
                  { days: "Sunday", hours: "4:00 PM - 1:00 AM" }
                ].map((schedule, index) => (
                  <motion.div
                    key={index}
                    className="flex justify-between items-center p-3 rounded-lg bg-black/20 hover:bg-yellow-400/10 transition-colors duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-gray-300">{schedule.days}</span>
                    <span className="text-white font-semibold">{schedule.hours}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, rotateY: -2 }}
              className="bg-gradient-to-br from-green-900/40 to-green-800/20 p-8 rounded-2xl border border-green-700/30 backdrop-blur-sm relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-transparent to-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <motion.div 
                className="flex items-center mb-6 relative z-10"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative">
                  <MapPin className="h-8 w-8 text-yellow-400 mr-4" />
                  <motion.div
                    className="absolute inset-0 bg-yellow-400/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white">Location</h3>
              </motion.div>
              
              <div className="space-y-4 relative z-10">
                <motion.p 
                  className="text-lg text-gray-300 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  123 Avenue Mohammed V<br />
                  Casablanca, Morocco
                  <br />
                  20000
                </motion.p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black bg-transparent relative overflow-hidden group/btn"
                    onClick={() => window.open("https://maps.google.com", "_blank")}
                  >
                    <motion.div
                      className="absolute inset-0 bg-yellow-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                    />
                    <MapPin className="h-4 w-4 mr-2 relative z-10" />
                    <span className="relative z-10">View on Google Maps</span>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-900/50 via-black to-green-900/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.1)_0%,transparent_70%)]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="flex justify-center mb-6"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", damping: 10 }}
              viewport={{ once: true }}
            >
              <Sparkles className="h-16 w-16 text-yellow-400" />
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-400 relative">
              Ready to Play?
              <motion.div
                className="absolute inset-0 bg-yellow-400/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </h2>
            
            <motion.p 
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              Book your table now and experience the finest billiard hall in Morocco. Whether it&apos;s a casual game with
              friends or a serious tournament, we&apos;re ready for you.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-black font-bold text-lg px-8 py-4 rounded-full shadow-2xl shadow-yellow-500/50 relative overflow-hidden group border-2 border-yellow-300/50"
                  onClick={() => window.open("https://wa.me/212XXXXXXXXX", "_blank")}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <Phone className="h-5 w-5 mr-2 relative z-10" />
                  <span className="relative z-10">Book on WhatsApp</span>
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold text-lg px-8 py-4 rounded-full bg-transparent backdrop-blur-sm relative overflow-hidden group"
                  onClick={() => window.open("tel:+212XXXXXXXXX", "_blank")}
                >
                  <motion.div
                    className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <Calendar className="h-5 w-5 mr-2 relative z-10" />
                  <span className="relative z-10">Call to Reserve</span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-12 px-4 border-t border-green-700/30 bg-gradient-to-b from-black to-green-950/20 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-yellow-400 mb-4 relative">
                Elite Billiards Morocco
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-yellow-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  viewport={{ once: true }}
                />
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Morocco&apos;s premier destination for billiards enthusiasts. Experience luxury, precision, and unforgettable
                moments.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                {["About Us", "Gallery", "Pricing", "Contact"].map((link, index) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    <a 
                      href={`#${link.toLowerCase().replace(' ', '')}`} 
                      className="hover:text-yellow-400 transition-colors duration-300 relative group inline-block"
                    >
                      {link}
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-yellow-400 opacity-0 group-hover:opacity-100"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-bold text-white mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {[
                  { icon: Instagram, color: "hover:text-pink-400" },
                  { icon: Facebook, color: "hover:text-blue-400" },
                  { icon: Twitter, color: "hover:text-sky-400" }
                ].map(({ icon: Icon, color }, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      size="icon"
                      variant="outline"
                      className={`border-yellow-400/50 hover:bg-yellow-400/20 bg-transparent backdrop-blur-sm relative overflow-hidden group ${color}`}
                    >
                      <Icon className="h-5 w-5 text-yellow-400 relative z-10" />
                      <motion.div
                        className="absolute inset-0 bg-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="border-t border-green-700/30 pt-8 text-center text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p>&copy; 2024 Elite Billiards Morocco. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}