
import React, { useEffect, useState } from 'react';
import { ContactInfo } from '@/types/contact';
import { useToast } from '@/components/ui/use-toast';
import { Smartphone } from 'lucide-react';

interface NFCShareProps {
  contactInfo: ContactInfo;
  isSharing: boolean;
}

const NFCShare: React.FC<NFCShareProps> = ({ contactInfo, isSharing }) => {
  const { toast } = useToast();
  const [nfcSupported, setNfcSupported] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if NFC is supported in this browser
    if ('NDEFReader' in window) {
      setNfcSupported(true);
    } else {
      setNfcSupported(false);
    }
  }, []);

  useEffect(() => {
    if (!isSharing || !nfcSupported) return;

    const shareViaNFC = async () => {
      try {
        // @ts-ignore - NDEFReader is not in the TypeScript types yet
        const ndef = new window.NDEFReader();
        await ndef.write({
          records: [{
            recordType: "url",
            data: `https://example.com/contact?data=${encodeURIComponent(JSON.stringify(contactInfo))}`,
          }]
        });
        
        toast({
          title: "Ready to share",
          description: "Tap your phone to another NFC-enabled device.",
        });
      } catch (error) {
        console.error("Error sharing via NFC:", error);
        toast({
          title: "NFC Error",
          description: "There was an error activating NFC. Please try again.",
          variant: "destructive",
        });
      }
    };

    shareViaNFC();

    return () => {
      // Clean up NFC sharing when component unmounts or isSharing becomes false
    };
  }, [isSharing, nfcSupported, contactInfo, toast]);

  if (!isSharing) return null;

  if (nfcSupported === false) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-sm text-center">
          <h3 className="text-xl font-bold mb-2">NFC Not Supported</h3>
          <p className="mb-4">Your device doesn't support NFC sharing. Try scanning a QR code instead.</p>
          <button 
            className="px-4 py-2 bg-bizcard-accent text-white rounded"
            onClick={() => toast({
              title: "Coming Soon",
              description: "QR code sharing will be available in a future update."
            })}
          >
            Generate QR Code
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-sm text-center">
        <div className="mb-6 flex justify-center">
          <div className="h-24 w-24 rounded-full bg-bizcard-accent/10 flex items-center justify-center">
            <Smartphone size={48} className="text-bizcard-accent animate-pulse-light" />
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2">Tap to Share</h3>
        <p className="mb-6 text-gray-600">
          Hold your phone near another NFC-enabled device to share your contact information.
        </p>
        <button 
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
          onClick={() => toast({
            title: "NFC Sharing Cancelled",
            description: "You've cancelled NFC sharing."
          })}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NFCShare;
