'use client'

import Image from 'next/image';
import { CheckCircle, Zap, Heart, Shield, Clock, Droplets, Sparkles, Beaker, Users, Award, TrendingUp, Star } from 'lucide-react';
import Footer from '@/components/Footer';

const About = () => {
    const ingredients = [
        { name: 'Electrolytes (Sodium, Potassium)', amount: '500mg', benefit: 'Rapid rehydration and mineral balance' },
        { name: 'Vitamin B Complex', amount: '100mg', benefit: 'Energy metabolism and nervous system support' },
        { name: 'Vitamin C', amount: '200mg', benefit: 'Antioxidant protection and immune support' },
        { name: 'Magnesium', amount: '150mg', benefit: 'Muscle function and headache relief' },
        { name: 'Zinc', amount: '15mg', benefit: 'Liver support and toxin processing' },
        { name: 'Natural Flavoring', amount: '50mg', benefit: 'Delicious taste experience' },
        { name: 'Citric Acid', amount: '25mg', benefit: 'Enhanced absorption and fizz effect' },
        { name: 'Natural Caffeine', amount: '30mg', benefit: 'Gentle energy boost without crash' }
    ];

    const benefits = [
        { icon: <Zap className="w-6 h-6" />, title: 'Instant Energy Boost', description: 'Feel revitalized within minutes with our fast-acting formula' },
        { icon: <Droplets className="w-6 h-6" />, title: 'Rapid Rehydration', description: 'Restore your body\'s fluid balance faster than water alone' },
        { icon: <Shield className="w-6 h-6" />, title: 'Liver Protection', description: 'Support your liver\'s natural detoxification process' },
        { icon: <Heart className="w-6 h-6" />, title: 'Hangover Prevention', description: 'Take before, during, or after drinking for maximum protection' },
        { icon: <Sparkles className="w-6 h-6" />, title: 'Mood Enhancement', description: 'B-vitamins help maintain positive mood and mental clarity' },
        { icon: <Clock className="w-6 h-6" />, title: '60-Second Dissolve', description: 'Completely dissolves in any liquid within 60 seconds' }
    ];

    const usageMethods = [
        {
            title: 'With Alcoholic Beverages',
            description: 'Mix with vodka, rum, whiskey, or any spirit',
            instructions: ['Add 1 tablet to 8oz of your favorite alcohol', 'Stir gently and wait 60 seconds', 'Enjoy your enhanced drink with protection'],
            icon: '🍸'
        },
        {
            title: 'With Water',
            description: 'Simple and effective hydration boost',
            instructions: ['Drop 1 tablet in 8-12oz of cold water', 'Watch it fizz and dissolve completely', 'Drink immediately for best results'],
            icon: '💧'
        },
        {
            title: 'Mocktail Creation',
            description: 'Create delicious non-alcoholic beverages',
            instructions: ['Combine with fruit juices or sodas', 'Add ice and fresh fruits for garnish', 'Perfect for parties and social events'],
            icon: '🍹'
        },
        {
            title: 'Pre-Party Preparation',
            description: 'Take before drinking for maximum protection',
            instructions: ['Dissolve in water 30 minutes before drinking', 'Creates a protective barrier in your system', 'Reduces hangover severity significantly'],
            icon: '🎉'
        }
    ];

    const flavors = [
        { name: 'Tropical Mango', color: 'from-orange-400 to-yellow-400', description: 'Sweet and exotic tropical taste' },
        { name: 'Berry Blast', color: 'from-purple-400 to-pink-400', description: 'Mixed berry explosion with natural sweetness' },
        { name: 'Citrus Lime', color: 'from-green-400 to-lime-400', description: 'Zesty and refreshing citrus kick' },
        { name: 'Watermelon Fizz', color: 'from-red-400 to-pink-400', description: 'Juicy watermelon with extra fizz' },
        { name: 'Grape Goodness', color: 'from-purple-500 to-indigo-400', description: 'Rich grape flavor with vitamin boost' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-400">
            
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-10 overflow-hidden">
                <div className="absolute top-20 left-10 w-32 h-32 bg-orange-300 rounded-full animate-bounce"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-500 rounded-full animate-pulse"></div>
                <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-red-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-orange-400 rounded-full animate-bounce"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

                {/* Hero Section */}
                <div className="bg-white/25 backdrop-blur-md rounded-3xl p-12 border border-white/40 shadow-2xl mb-12">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                            About Our Revolutionary
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                                Anti-Hangover Formula
                            </span>
                        </h1>
                        <p className="text-xl text-gray-800 max-w-4xl mx-auto leading-relaxed mb-8">
                            Experience the future of responsible drinking with our scientifically-formulated, 
                            fast-dissolving tablets that provide instant energy, rapid rehydration, and 
                            comprehensive hangover protection. Transform any drink into a health-boosting elixir!
                        </p>
                        <div className="flex justify-center gap-4 flex-wrap">
                            <div className="bg-white/30 backdrop-blur-sm px-6 py-3 rounded-full border border-white/40">
                                <span className="text-gray-900 font-bold">✨ 60-Second Dissolve</span>
                            </div>
                            <div className="bg-white/30 backdrop-blur-sm px-6 py-3 rounded-full border border-white/40">
                                <span className="text-gray-900 font-bold">🧪 Scientifically Proven</span>
                            </div>
                            <div className="bg-white/30 backdrop-blur-sm px-6 py-3 rounded-full border border-white/40">
                                <span className="text-gray-900 font-bold">🌿 100% Natural</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Benefits Grid */}
                <div className="bg-white/25 backdrop-blur-md rounded-3xl p-10 border border-white/40 shadow-2xl mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
                        Why Choose Our Anti-Hangover Formula?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:bg-white/30 transition-all duration-300">
                                <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 text-orange-600">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                                <p className="text-gray-700 text-sm leading-relaxed">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ingredients Table */}
              <div className="p-10 rounded-3xl mb-12 shadow-md">
  <h2 className="text-3xl font-bold text-black text-center mb-10">
    Premium Ingredients & Their Benefits
  </h2>

  <div className="overflow-x-auto">
    <table className="w-full border border-black bg-transparent">
      <thead>
        <tr>
          <th className="text-left p-4 text-black font-bold border border-black bg-transparent">
            Ingredient
          </th>
          <th className="text-left p-4 text-black font-bold border border-black bg-transparent">
            Amount
          </th>
          <th className="text-left p-4 text-black font-bold border border-black bg-transparent">
            Health Benefit
          </th>
        </tr>
      </thead>
      <tbody>
        {ingredients.map((ingredient, index) => (
          <tr
            key={index}
            className="hover:bg-black/10 transition-colors duration-200"
          >
            <td className="p-4 text-black border border-black bg-transparent">
              {ingredient.name}
            </td>
            <td className="p-4 text-black border border-black bg-transparent">
              {ingredient.amount}
            </td>
            <td className="p-4 text-black border border-black bg-transparent">
              {ingredient.benefit}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


                {/* Usage Methods */}
                <div className="bg-white/25 backdrop-blur-md rounded-3xl p-10 border border-white/40 shadow-2xl mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
                        Multiple Ways to Enjoy
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {usageMethods.map((method, index) => (
                            <div key={index} className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="text-3xl">{method.icon}</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{method.title}</h3>
                                        <p className="text-gray-700">{method.description}</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {method.instructions.map((instruction, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                                                {idx + 1}
                                            </div>
                                            <p className="text-gray-800 text-sm">{instruction}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Available Flavors */}
                <div className="bg-white/25 backdrop-blur-md rounded-3xl p-10 border border-white/40 shadow-2xl mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
                        Delicious Flavor Collection
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {flavors.map((flavor, index) => (
                            <div key={index} className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:scale-105 transition-all duration-300">
                                <div className={`w-full h-32 bg-gradient-to-br ${flavor.color} rounded-xl mb-4 flex items-center justify-center`}>
                                    <span className="text-white text-2xl font-bold">{flavor.name}</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{flavor.name}</h3>
                                <p className="text-gray-700 text-sm">{flavor.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* How It Works */}
                <div className="bg-white/25 backdrop-blur-md rounded-3xl p-10 border border-white/40 shadow-2xl mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
                        How Our Formula Works
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                                💧
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Step 1: Rapid Dissolution</h3>
                            <p className="text-gray-700">Our advanced formula dissolves completely in just 60 seconds, releasing active ingredients immediately.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                                ⚡
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Step 2: Instant Absorption</h3>
                            <p className="text-gray-700">Electrolytes and vitamins are absorbed directly into your bloodstream for immediate effect.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                                🛡️
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Step 3: Complete Protection</h3>
                            <p className="text-gray-700">Your body is protected, energized, and ready to handle whatever the night brings.</p>
                        </div>
                    </div>
                </div>

                {/* Health Benefits */}
                <div className="bg-white/25 backdrop-blur-md rounded-3xl p-10 border border-white/40 shadow-2xl mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
                        Comprehensive Health Benefits
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Physical Benefits</h3>
                            {[
                                'Prevents dehydration and electrolyte imbalance',
                                'Reduces nausea and stomach discomfort',
                                'Eliminates headaches and body aches',
                                'Boosts energy levels naturally',
                                'Supports liver detoxification',
                                'Improves overall recovery time'
                            ].map((benefit, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span className="text-gray-800">{benefit}</span>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Mental Benefits</h3>
                            {[
                                'Maintains mental clarity and focus',
                                'Prevents mood swings and irritability',
                                'Supports cognitive function',
                                'Reduces anxiety and stress',
                                'Improves sleep quality',
                                'Enhances overall well-being'
                            ].map((benefit, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-600" />
                                    <span className="text-gray-800">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Statistics */}
                <div className="bg-white/25 backdrop-blur-md rounded-3xl p-10 border border-white/40 shadow-2xl mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
                        Proven Results
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-4xl font-black text-orange-600 mb-2">95%</div>
                            <p className="text-gray-800 font-medium">Hangover Prevention Rate</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-black text-blue-600 mb-2">60s</div>
                            <p className="text-gray-800 font-medium">Complete Dissolution Time</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-black text-green-600 mb-2">100K+</div>
                            <p className="text-gray-800 font-medium">Satisfied Customers</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-black text-purple-600 mb-2">4.9★</div>
                            <p className="text-gray-800 font-medium">Average Rating</p>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-white/25 backdrop-blur-md rounded-3xl p-10 border border-white/40 shadow-2xl">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {[
                            {
                                question: "How quickly does it work?",
                                answer: "Our formula starts working within 15-30 minutes of consumption. The tablets dissolve in 60 seconds, and you'll feel the effects almost immediately."
                            },
                            {
                                question: "Is it safe to use with alcohol?",
                                answer: "Our formula is specifically designed to be mixed with alcoholic beverages. It's made with natural ingredients and is completely safe."
                            },
                            {
                                question: "Can I use it for mocktails?",
                                answer: "Yes! Our tablets make excellent mocktails. Mix with fruit juices, sodas, or sparkling water for delicious non-alcoholic beverages."
                            },
                            {
                                question: "How many tablets should I take?",
                                answer: "For best results, use 1 tablet per 8-12oz of liquid. You can take up to 3 tablets per day, spaced throughout your drinking session."
                            },
                            {
                                question: "Are there any side effects?",
                                answer: "Our formula is made with natural ingredients and is generally well-tolerated. Some people may experience mild fizzing sensation, which is normal."
                            }
                        ].map((faq, index) => (
                            <div key={index} className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
<Footer/>
        </div>

);
};

export default About;
