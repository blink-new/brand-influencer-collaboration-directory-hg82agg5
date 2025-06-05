import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Users, Sparkles, TrendingUp, Star, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  const navigate = useNavigate()
  const [userType, setUserType] = useState<'brand' | 'influencer' | null>(null)

  const handleGetStarted = () => {
    if (userType) {
      navigate('/onboarding', { state: { userType } })
    }
  }

  const features = [
    {
      icon: Users,
      title: 'Connect & Collaborate',
      description: 'Find perfect matches between brands and influencers for authentic partnerships'
    },
    {
      icon: Sparkles,
      title: 'Showcase Your Work',
      description: 'Create stunning profiles that highlight your unique value and past collaborations'
    },
    {
      icon: TrendingUp,
      title: 'Grow Together',
      description: 'Track collaboration success and build long-term partnerships that drive results'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Lifestyle Influencer',
      content: "Found amazing brand partnerships that align perfectly with my audience. The platform makes collaboration so seamless!",
      rating: 5
    },
    {
      name: 'Mike Rodriguez',
      role: 'Brand Manager, TechFlow',
      content: "We've discovered incredible micro-influencers who truly understand our brand values. ROI has increased by 300%!",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                CollabHub
              </span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it Works</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Testimonials</a>
            </nav>
            
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-6">
            🚀 Join 10,000+ creators and brands
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Where Brands & 
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Influencers </span>
            Connect
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover authentic partnerships, showcase your unique value, and build collaborations 
            that drive real results for both brands and creators.
          </p>

          {/* User Type Selection */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Card 
              className={`cursor-pointer transition-all hover:shadow-lg border-2 ${
                userType === 'brand' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
              }`}
              onClick={() => setUserType('brand')}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">I'm a Brand</CardTitle>
                <CardDescription>Looking for influencers to promote my products</CardDescription>
              </CardHeader>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-lg border-2 ${
                userType === 'influencer' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setUserType('influencer')}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">I'm an Influencer</CardTitle>
                <CardDescription>Ready to collaborate with amazing brands</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={handleGetStarted}
            disabled={!userType}
          >
            Get Started <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to collaborate
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides all the tools you need to find, connect, and collaborate successfully.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by creators and brands
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">CollabHub</span>
            </div>
            <p className="text-gray-400">2024 CollabHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}