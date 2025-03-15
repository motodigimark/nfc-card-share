
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { ContactInfo } from "@/types/contact";

interface BusinessCardProps {
  contactInfo: ContactInfo;
  onShare: () => void;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ contactInfo, onShare }) => {
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg bg-bizcard-background">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Avatar className="h-16 w-16 border-2 border-bizcard-accent">
            <AvatarImage src={contactInfo.avatar || ''} alt={contactInfo.name} />
            <AvatarFallback className="bg-bizcard-accent text-white text-xl">
              {contactInfo.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold text-bizcard-text">{contactInfo.name}</h2>
            <p className="text-bizcard-subtle">{contactInfo.title}</p>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-3">
          {contactInfo.company && (
            <div className="flex items-center">
              <span className="text-bizcard-text font-semibold w-24">Company:</span>
              <span className="text-bizcard-text">{contactInfo.company}</span>
            </div>
          )}
          
          {contactInfo.email && (
            <div className="flex items-center">
              <span className="text-bizcard-text font-semibold w-24">Email:</span>
              <span className="text-bizcard-text">{contactInfo.email}</span>
            </div>
          )}
          
          {contactInfo.phone && (
            <div className="flex items-center">
              <span className="text-bizcard-text font-semibold w-24">Phone:</span>
              <span className="text-bizcard-text">{contactInfo.phone}</span>
            </div>
          )}
          
          {contactInfo.website && (
            <div className="flex items-center">
              <span className="text-bizcard-text font-semibold w-24">Website:</span>
              <span className="text-bizcard-text">{contactInfo.website}</span>
            </div>
          )}
        </div>

        <div className="mt-6">
          <Button 
            onClick={onShare} 
            className="w-full bg-bizcard-accent hover:bg-opacity-90 text-white flex items-center justify-center space-x-2"
          >
            <Share size={18} />
            <span>Share via NFC</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessCard;
