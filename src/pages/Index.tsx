
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import BusinessCard from '@/components/BusinessCard';
import ContactForm from '@/components/ContactForm';
import NFCShare from '@/components/NFCShare';
import { ContactInfo } from '@/types/contact';
import { Smartphone, Edit, Share2 } from 'lucide-react';

const STORAGE_KEY = 'nfc-business-card-info';

const defaultContactInfo: ContactInfo = {
  name: 'Alex Johnson',
  title: 'Software Engineer',
  company: 'Tech Solutions Inc.',
  email: 'alex@example.com',
  phone: '(555) 123-4567',
  website: 'https://alexjohnson.example.com',
};

const Index = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContactInfo);
  const [isSharing, setIsSharing] = useState(false);
  const [activeTab, setActiveTab] = useState('view');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Load saved contact info from localStorage
    const savedInfo = localStorage.getItem(STORAGE_KEY);
    if (savedInfo) {
      try {
        setContactInfo(JSON.parse(savedInfo));
      } catch (error) {
        console.error('Error parsing saved contact info:', error);
      }
    }
  }, []);

  const handleSaveContact = (data: ContactInfo) => {
    setContactInfo(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setActiveTab('view');
    toast({
      title: 'Success',
      description: 'Your contact information has been saved.',
    });
  };

  const handleShareNFC = () => {
    if ('NDEFReader' in window) {
      setIsSharing(true);
    } else {
      toast({
        title: 'NFC Not Supported',
        description: 'Your device doesn\'t support NFC. Try using a QR code instead.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-bizcard-accent">NFC Business Card</h1>
        <p className="text-bizcard-subtle">Share your contact info with a tap</p>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="view" className="flex items-center gap-2">
            <Share2 size={16} />
            <span>My Card</span>
          </TabsTrigger>
          <TabsTrigger value="edit" className="flex items-center gap-2">
            <Edit size={16} />
            <span>Edit Info</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="view" className="flex flex-col items-center gap-6">
          <BusinessCard contactInfo={contactInfo} onShare={handleShareNFC} />
          
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">How to share your card</h3>
              <div className="flex items-start space-x-4">
                <div className="bg-bizcard-accent/10 p-3 rounded-full">
                  <Smartphone size={24} className="text-bizcard-accent" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Tap the "Share via NFC" button and hold your phone near another NFC-enabled device to share your contact information.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="edit">
          <ContactForm initialData={contactInfo} onSave={handleSaveContact} />
        </TabsContent>
      </Tabs>

      {isSharing && <NFCShare contactInfo={contactInfo} isSharing={isSharing} />}
    </div>
  );
};

export default Index;
