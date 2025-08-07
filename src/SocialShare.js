import React from 'react';

function SocialShare({ destination, tripPlan }) {
  const shareText = `🌍 Planning an amazing trip to ${destination}! Check out my travel plan created with TravelBuddy AI ✈️ #TravelBuddy #Travel #${destination.replace(/\s+/g, '')}`;
  const shareUrl = window.location.href;

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=550,height=400');
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'width=550,height=400');
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(`Travel Plan for ${destination}`)}&summary=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'width=550,height=400');
  };

  const shareOnWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    window.open(url, '_blank');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText + ' ' + shareUrl);
      alert('Trip plan copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareText + ' ' + shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Trip plan copied to clipboard!');
    }
  };

  return (
    <div className="social-share">
      <h3>📱 Share Your Travel Plan</h3>
      <div className="share-buttons">
        <button 
          onClick={shareOnTwitter}
          className="share-btn twitter"
          title="Share on Twitter"
        >
          🐦 Twitter
        </button>
        <button 
          onClick={shareOnFacebook}
          className="share-btn facebook"
          title="Share on Facebook"
        >
          📘 Facebook
        </button>
        <button 
          onClick={shareOnLinkedIn}
          className="share-btn linkedin"
          title="Share on LinkedIn"
        >
          💼 LinkedIn
        </button>
        <button 
          onClick={shareOnWhatsApp}
          className="share-btn whatsapp"
          title="Share on WhatsApp"
        >
          💬 WhatsApp
        </button>
        <button 
          onClick={copyToClipboard}
          className="share-btn copy"
          title="Copy to Clipboard"
        >
          📋 Copy Link
        </button>
      </div>
      <div className="share-tips">
        <p>💡 <strong>Pro Tip:</strong> Share your travel plan with friends and family to get their input and suggestions!</p>
      </div>
    </div>
  );
}

export default SocialShare;