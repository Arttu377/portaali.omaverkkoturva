import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Shield, Eye, FileText, HeadphonesIcon } from 'lucide-react';

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </PageLayout>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const products = [
    {
      name: "Identiteettiturva yhdelle",
      price: "19,99 €/kk",
      features: [
        "Suojaa laite",
        "Tietojen monitorointi ja ilmoitus tietovuodoista",
        "Vakuutus, joka turvaa sinut vahinkojen varalta",
        "Apu ja tuki"
      ]
    },
    {
      name: "Identiteettiturva kahdelle", 
      price: "26,99 €/kk",
      features: [
        "Suojaa laite",
        "Tietojen monitorointi ja ilmoitus tietovuodoista",
        "Vakuutus, joka turvaa sinut vahinkojen varalta",
        "Apu ja tuki"
      ]
    },
    {
      name: "Identiteettiturva viidelle",
      price: "30,99 €/kk", 
      features: [
        "Suojaa laite",
        "Tietojen monitorointi ja ilmoitus tietovuodoista",
        "Vakuutus, joka turvaa sinut vahinkojen varalta",
        "Apu ja tuki"
      ]
    }
  ];

  const getFeatureIcon = (feature: string) => {
    if (feature.includes("Suojaa")) return <Shield className="w-4 h-4" />;
    if (feature.includes("monitorointi")) return <Eye className="w-4 h-4" />;
    if (feature.includes("Vakuutus")) return <FileText className="w-4 h-4" />;
    if (feature.includes("Apu")) return <HeadphonesIcon className="w-4 h-4" />;
    return <Shield className="w-4 h-4" />;
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-background py-12 pt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Tervetuloa!</h1>
            <p className="text-xl text-muted-foreground">Hallitse tilauksiasi täältä.</p>
          </div>

          {/* Verkkokauppaan Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-8">
              <ShoppingCart className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Verkkokauppaan</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <Card key={index} className="relative">
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                    <CardDescription className="text-3xl font-bold text-primary">
                      {product.price}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {product.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          {getFeatureIcon(feature)}
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" size="lg">
                      Valitse paketti
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;