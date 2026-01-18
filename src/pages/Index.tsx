import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Eye, Sparkles, ArrowRight, Star, Shield, Truck } from 'lucide-react';
import { sampleRugs } from '@/data/sampleRugs';

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-20 items-center justify-between">
          <Link to="/" className="font-display text-2xl font-bold text-foreground">
            Luxe<span className="text-gold">Rugs</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#collection" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Collection
            </a>
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <Link 
              to="/view-in-room"
              className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold/80 transition-colors"
            >
              <Eye className="h-4 w-4" />
              View in Room
            </Link>
          </nav>

          <Link to="/view-in-room">
            <Button className="gap-2 bg-burgundy hover:bg-burgundy-dark">
              <Brain className="h-4 w-4" />
              Try AI Preview
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream to-background -z-10" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl -z-10" />
        
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 gap-2 bg-gold/10 text-gold border-gold/20 px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Room Visualization
            </Badge>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Luxury Rugs,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-burgundy to-gold">
                Reimagined
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Experience the world's finest hand-crafted rugs with our revolutionary AI 
              visualization technology. See exactly how each piece will transform your space.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/view-in-room">
                <Button size="lg" className="gap-2 bg-burgundy hover:bg-burgundy-dark px-8 py-6 text-lg shadow-luxury">
                  <Brain className="h-5 w-5" />
                  View in Your Room
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2 px-8 py-6 text-lg">
                Explore Collection
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Feature Highlight */}
      <section className="py-16 bg-charcoal text-cream">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/20">
                <Brain className="h-8 w-8 text-gold" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">AI Floor Detection</h3>
                <p className="text-cream/70">Real neural network analysis, not just an overlay</p>
              </div>
            </div>
            
            <div className="hidden md:block h-12 w-px bg-cream/20" />
            
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/20">
                <Eye className="h-8 w-8 text-gold" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Perspective Matching</h3>
                <p className="text-cream/70">Rugs fit naturally with depth-aware scaling</p>
              </div>
            </div>
            
            <div className="hidden md:block h-12 w-px bg-cream/20" />
            
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/20">
                <Sparkles className="h-8 w-8 text-gold" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Realistic Shadows</h3>
                <p className="text-cream/70">AI-generated contact shadows for realism</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collection Preview */}
      <section id="collection" className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Curated Collection
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each rug in our collection is hand-selected for its exceptional craftsmanship, 
              quality materials, and timeless design.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleRugs.slice(0, 6).map((rug) => (
              <Link 
                key={rug.id} 
                to="/view-in-room"
                className="group luxury-card overflow-hidden"
              >
                {/* Rug Preview */}
                <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                  <img 
                    src={rug.imageUrl} 
                    alt={rug.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button variant="secondary" size="sm" className="gap-2">
                      <Eye className="h-4 w-4" />
                      View in Room
                    </Button>
                  </div>

                  {/* Sale badge */}
                  {rug.originalPrice && (
                    <Badge className="absolute top-3 left-3 bg-burgundy text-primary-foreground border-0">
                      Sale
                    </Badge>
                  )}
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{rug.name}</h3>
                      <p className="text-sm text-muted-foreground">{rug.collection}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gold">${rug.price.toLocaleString()}</p>
                      {rug.originalPrice && (
                        <p className="text-sm text-muted-foreground line-through">
                          ${rug.originalPrice.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{rug.dimensions.width}' × {rug.dimensions.height}'</span>
                    <span>·</span>
                    <span>{rug.material}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" className="gap-2">
              View All Rugs
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { icon: Star, title: '5-Star Reviews', description: 'Over 10,000 happy customers worldwide' },
              { icon: Shield, title: 'Authenticity Guarantee', description: 'Every rug certified and verified' },
              { icon: Truck, title: 'White Glove Delivery', description: 'Free shipping & professional installation' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-background border border-border">
                  <item.icon className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-burgundy to-burgundy-dark text-primary-foreground">
        <div className="container text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            See the Difference AI Makes
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
            Our AI doesn't just overlay a rug image. It analyzes your room's floor, 
            computes perspective, and generates photorealistic results.
          </p>
          <Link to="/view-in-room">
            <Button size="lg" variant="secondary" className="gap-2 px-8 py-6 text-lg">
              <Brain className="h-5 w-5" />
              Try View in Room Now
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-display text-xl font-bold text-foreground">
              Luxe<span className="text-gold">Rugs</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 LuxeRugs. AI-Powered Rug Visualization.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
