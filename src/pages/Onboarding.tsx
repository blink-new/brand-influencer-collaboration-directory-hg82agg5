import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  CardDescription,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  CardHeader,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  CardTitle
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { 
  User, 
  Building2, 
  AtSign, 
  Camera,
  ChevronRight,
  ChevronLeft,
  Check
} from 'lucide-react';

interface OnboardingData {
  // Common fields
  userType: 'brand' | 'influencer';
  email: string;
  password: string;
  
  // Brand specific
  companyName?: string;
  industry?: string;
  website?: string;
  description?: string;
  targetAudience?: string;
  budgetRange?: string;
  
  // Influencer specific
  fullName?: string;
  username?: string;
  niches?: string[];
  followers?: string;
  platforms?: string[];
  rates?: string;
  bio?: string;
  profileImage?: string;
}

export default function Onboarding() {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || 'influencer';
  
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    userType,
    email: '',
    password: '',
  });

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const updateData = <Field extends keyof OnboardingData>(field: Field, value: OnboardingData[Field]) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit and go to dashboard
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <AuthStep data={data} updateData={updateData} />;
      case 2:
        return userType === 'brand' 
          ? <BrandDetailsStep data={data} updateData={updateData} />
          : <InfluencerDetailsStep data={data} updateData={updateData} />;
      case 3:
        return userType === 'brand'
          ? <BrandProfileStep data={data} updateData={updateData} />
          : <InfluencerProfileStep data={data} updateData={updateData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            {userType === 'brand' ? 'Brand' : 'Influencer'} Onboarding
          </Badge>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to CollabHub!
          </h1>
          <p className="text-gray-600">
            Let's set up your profile to start finding perfect collaborations
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-500">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
        </div>

        {/* Step Content */}
        <Card className="shadow-xl border-0">
          <CardContent className="p-8">
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            {currentStep === totalSteps ? (
              <>
                Complete Setup
                <Check className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Step Components
function AuthStep({ data, updateData }: { data: OnboardingData; updateData: <Field extends keyof OnboardingData>(field: Field, value: OnboardingData[Field]) => void }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Create your account</h2>
        <p className="text-gray-600">Enter your email and choose a secure password</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={data.email}
            onChange={(e) => updateData('email', e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Choose a secure password"
            value={data.password}
            onChange={(e) => updateData('password', e.target.value)}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
}

function BrandDetailsStep({ data, updateData }: { data: OnboardingData; updateData: <Field extends keyof OnboardingData>(field: Field, value: OnboardingData[Field]) => void }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building2 className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Tell us about your brand</h2>
        <p className="text-gray-600">Help influencers understand what you're looking for</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            placeholder="Your company name"
            value={data.companyName || ''}
            onChange={(e) => updateData('companyName', e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="industry">Industry</Label>
          <Input
            id="industry"
            placeholder="e.g., Fashion, Tech, Food & Beverage"
            value={data.industry || ''}
            onChange={(e) => updateData('industry', e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            type="url"
            placeholder="https://your-website.com"
            value={data.website || ''}
            onChange={(e) => updateData('website', e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="targetAudience">Target Audience</Label>
          <Textarea
            id="targetAudience"
            placeholder="Describe your ideal customer demographics and interests"
            value={data.targetAudience || ''}
            onChange={(e) => updateData('targetAudience', e.target.value)}
            className="mt-1"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
}

function InfluencerDetailsStep({ data, updateData }: { data: OnboardingData; updateData: <Field extends keyof OnboardingData>(field: Field, value: OnboardingData[Field]) => void }) {
  const platforms = ['Instagram', 'TikTok', 'YouTube', 'Twitter', 'LinkedIn'];
  const niches = ['Fashion', 'Beauty', 'Fitness', 'Tech', 'Travel', 'Food', 'Lifestyle', 'Gaming'];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <AtSign className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your creator details</h2>
        <p className="text-gray-600">Help brands discover your unique value</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            placeholder="Your full name"
            value={data.fullName || ''}
            onChange={(e) => updateData('fullName', e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="username">Username/Handle</Label>
          <Input
            id="username"
            placeholder="@yourusername"
            value={data.username || ''}
            onChange={(e) => updateData('username', e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label>Primary Platforms</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {platforms.map(platform => (
              <label key={platform} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={data.platforms?.includes(platform) || false}
                  onChange={(e) => {
                    const current = data.platforms || [];
                    if (e.target.checked) {
                      updateData('platforms', [...current, platform]);
                    } else {
                      updateData('platforms', current.filter(p => p !== platform));
                    }
                  }}
                  className="rounded"
                />
                <span className="text-sm">{platform}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <Label>Content Niches</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {niches.map(niche => (
              <Badge
                key={niche}
                variant={data.niches?.includes(niche) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => {
                  const current = data.niches || [];
                  if (current.includes(niche)) {
                    updateData('niches', current.filter(n => n !== niche));
                  } else {
                    updateData('niches', [...current, niche]);
                  }
                }}
              >
                {niche}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BrandProfileStep({ data, updateData }: { data: OnboardingData; updateData: <Field extends keyof OnboardingData>(field: Field, value: OnboardingData[Field]) => void }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Camera className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Complete your profile</h2>
        <p className="text-gray-600">Add details that help you stand out</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="description">Brand Description</Label>
          <Textarea
            id="description"
            placeholder="Tell influencers what makes your brand special"
            value={data.description || ''}
            onChange={(e) => updateData('description', e.target.value)}
            className="mt-1"
            rows={4}
          />
        </div>
        
        <div>
          <Label>Budget Range</Label>
          <RadioGroup 
            value={data.budgetRange || ''} 
            onValueChange={(value) => updateData('budgetRange', value)}
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="under-1k" id="under-1k" />
              <Label htmlFor="under-1k">Under $1,000 per campaign</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1k-5k" id="1k-5k" />
              <Label htmlFor="1k-5k">$1,000 - $5,000 per campaign</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="5k-10k" id="5k-10k" />
              <Label htmlFor="5k-10k">$5,000 - $10,000 per campaign</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="10k-plus" id="10k-plus" />
              <Label htmlFor="10k-plus">$10,000+ per campaign</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}

function InfluencerProfileStep({ data, updateData }: { data: OnboardingData; updateData: <Field extends keyof OnboardingData>(field: Field, value: OnboardingData[Field]) => void }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Camera className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Complete your profile</h2>
        <p className="text-gray-600">Showcase what makes you unique</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-center">
          <Avatar className="w-24 h-24">
            <AvatarImage src={data.profileImage} />
            <AvatarFallback>{data.fullName?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
        </div>
        
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell brands about your content style and audience"
            value={data.bio || ''}
            onChange={(e) => updateData('bio', e.target.value)}
            className="mt-1"
            rows={4}
          />
        </div>
        
        <div>
          <Label htmlFor="followers">Total Followers (across all platforms)</Label>
          <Input
            id="followers"
            placeholder="e.g., 50K, 100K, 1M"
            value={data.followers || ''}
            onChange={(e) => updateData('followers', e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label>Collaboration Rates</Label>
          <RadioGroup 
            value={data.rates || ''} 
            onValueChange={(value) => updateData('rates', value)}
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="under-500" id="under-500" />
              <Label htmlFor="under-500">Under $500 per post</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="500-1k" id="500-1k" />
              <Label htmlFor="500-1k">$500 - $1,000 per post</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1k-5k" id="1k-5k-inf" />
              <Label htmlFor="1k-5k-inf">$1,000 - $5,000 per post</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="5k-plus" id="5k-plus" />
              <Label htmlFor="5k-plus">$5,000+ per post</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}