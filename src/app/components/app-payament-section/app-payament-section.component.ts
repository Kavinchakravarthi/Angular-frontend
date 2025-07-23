import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-6xl mx-auto p-4 bg-gray-50 min-h-screen">
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Left Section - Payment Methods -->
        <div class="lg:w-2/3">
          <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-xl font-bold text-gray-800 mb-6">Choose Payment Method</h2>
            
            <!-- Payment Tabs -->
            <div class="flex border-b border-gray-200 mb-6">
              <button 
                *ngFor="let tab of paymentTabs" 
                (click)="activeTab = tab.id"
                [class]="activeTab === tab.id ? 'border-b-2 border-red-600 text-red-600' : 'text-gray-500'"
                class="px-4 py-2 font-medium focus:outline-none"
              >
                {{tab.label}}
              </button>
            </div>

            <!-- Card Payment -->
            <div *ngIf="activeTab === 'card'" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <div class="relative">
                    <input 
                      type="text" 
                      [(ngModel)]="cardDetails.number" 
                      placeholder="1234 5678 9012 3456" 
                      class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-500 focus:border-red-400 outline-none transition"
                      maxlength="19"
                      (input)="formatCardNumber()"
                    >
                    <div class="absolute right-3 top-3 flex space-x-1">
                      <img *ngFor="let card of supportedCards" [src]="card.icon" class="h-6" [class.opacity-30]="!isCardType(card.type)">
                    </div>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                  <input 
                    type="text" 
                    [(ngModel)]="cardDetails.name" 
                    placeholder="John Doe" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-500 focus:border-red-400 outline-none transition"
                  >
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input 
                    type="text" 
                    [(ngModel)]="cardDetails.expiry" 
                    placeholder="MM/YY" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-500 focus:border-red-400 outline-none transition"
                    maxlength="5"
                    (input)="formatExpiry()"
                  >
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <div class="relative">
                    <input 
                      type="password" 
                      [(ngModel)]="cardDetails.cvv" 
                      placeholder="123" 
                      class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-500 focus:border-red-400 outline-none transition"
                      maxlength="4"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 absolute right-3 top-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="flex items-center">
                <input type="checkbox" id="saveCard" class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded">
                <label for="saveCard" class="ml-2 block text-sm text-gray-700">Save this card for faster payments</label>
              </div>
            </div>

            <!-- UPI Payment -->
            <div *ngIf="activeTab === 'upi'" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                <input 
                  type="text" 
                  [(ngModel)]="upiId" 
                  placeholder="yourname@upi" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-500 focus:border-red-400 outline-none transition"
                >
              </div>

              <div class="grid grid-cols-4 gap-2">
                <button 
                  *ngFor="let app of upiApps" 
                  (click)="selectUpiApp(app)"
                  [class]="selectedUpiApp === app.name ? 'border-2 border-red-500' : 'border border-gray-200'"
                  class="p-2 rounded-md flex flex-col items-center justify-center"
                >
                  <img [src]="app.icon" class="h-8 mb-1">
                  <span class="text-xs text-gray-600">{{app.name}}</span>
                </button>
              </div>
            </div>

            <!-- Net Banking -->
            <div *ngIf="activeTab === 'netbanking'" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Select Bank</label>
                <div class="relative">
                  <select 
                    [(ngModel)]="selectedBank" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-500 focus:border-red-400 outline-none transition appearance-none"
                  >
                    <option value="">Select your bank</option>
                    <option *ngFor="let bank of banks" [value]="bank.code">{{bank.name}}</option>
                  </select>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 absolute right-3 top-3.5 pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Wallet -->
            <div *ngIf="activeTab === 'wallet'" class="space-y-6">
              <div class="grid grid-cols-3 gap-4">
                <button 
                  *ngFor="let wallet of wallets" 
                  (click)="selectWallet(wallet)"
                  [class]="selectedWallet === wallet.name ? 'border-2 border-red-500' : 'border border-gray-200'"
                  class="p-3 rounded-md flex items-center"
                >
                  <img [src]="wallet.icon" class="h-8 mr-2">
                  <span class="text-sm font-medium">{{wallet.name}}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4">Contact Information</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  [(ngModel)]="contactInfo.email" 
                  placeholder="your@email.com" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-500 focus:border-red-400 outline-none transition"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input 
                  type="tel" 
                  [(ngModel)]="contactInfo.mobile" 
                  placeholder="9876543210" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-500 focus:border-red-400 outline-none transition"
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Right Section - Booking Summary -->
        <div class="lg:w-1/3">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 class="text-xl font-bold text-gray-800 mb-6">Booking Summary</h2>
            
            <div class="border-b border-gray-200 pb-4 mb-4">
              <h3 class="font-semibold text-gray-700 mb-2">Bus Details</h3>
              <div class="flex justify-between mb-1">
                <span class="text-gray-600">Operator</span>
                <span class="font-medium">{{bookingDetails.operator}}</span>
              </div>
              <div class="flex justify-between mb-1">
                <span class="text-gray-600">Bus Type</span>
                <span class="font-medium">{{bookingDetails.busType}}</span>
              </div>
              <div class="flex justify-between mb-1">
                <span class="text-gray-600">Departure</span>
                <span class="font-medium">{{bookingDetails.departureTime}}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Arrival</span>
                <span class="font-medium">{{bookingDetails.arrivalTime}}</span>
              </div>
            </div>

            <div class="border-b border-gray-200 pb-4 mb-4">
              <h3 class="font-semibold text-gray-700 mb-2">Journey Details</h3>
              <div class="flex justify-between mb-1">
                <span class="text-gray-600">From</span>
                <span class="font-medium">{{bookingDetails.from}}</span>
              </div>
              <div class="flex justify-between mb-1">
                <span class="text-gray-600">To</span>
                <span class="font-medium">{{bookingDetails.to}}</span>
              </div>
              <div class="flex justify-between mb-1">
                <span class="text-gray-600">Date</span>
                <span class="font-medium">{{bookingDetails.date}}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Passengers</span>
                <span class="font-medium">{{bookingDetails.passengers}}</span>
              </div>
            </div>

            <div class="border-b border-gray-200 pb-4 mb-4">
              <h3 class="font-semibold text-gray-700 mb-2">Fare Summary</h3>
              <div class="flex justify-between mb-1">
                <span class="text-gray-600">Base Fare</span>
                <span class="font-medium">₹{{bookingDetails.baseFare}}</span>
              </div>
              <div class="flex justify-between mb-1">
                <span class="text-gray-600">Taxes & Fees</span>
                <span class="font-medium">₹{{bookingDetails.taxes}}</span>
              </div>
              <div class="flex justify-between mb-1">
                <span class="text-gray-600">Discount</span>
                <span class="font-medium text-green-600">-₹{{bookingDetails.discount}}</span>
              </div>
              <div class="flex justify-between font-bold text-lg mt-2">
                <span>Total Amount</span>
                <span>₹{{bookingDetails.total}}</span>
              </div>
            </div>

            <div class="bg-red-50 border border-red-100 rounded-md p-3 mb-4">
              <div class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clip-rule="evenodd" />
                </svg>
                <p class="text-sm text-red-600">Cancellation fees may apply as per operator policy. Please check terms before booking.</p>
              </div>
            </div>

            <button 
              (click)="makePayment()"
              class="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-bold transition duration-300 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
              Pay ₹{{bookingDetails.total}} Securely
            </button>

            <div class="flex items-center justify-center mt-4">
              <img src="/assets/Images/payment-security.png" alt="Payment Security" class="h-8 mr-2">
              <span class="text-xs text-gray-500">100% Secure Payments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    input[type="checkbox"]:checked {
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
      background-color: currentColor;
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
    }
  `]
})
export class PaymentSectionComponent {
  @Input() bookingDetails: any = {
    operator: 'Sharma Travels',
    busType: 'AC Sleeper (2+1)',
    departureTime: '10:30 PM',
    arrivalTime: '06:30 AM (+1 day)',
    from: 'Bangalore',
    to: 'Chennai',
    date: '25 Jul, 2023',
    passengers: 2,
    baseFare: 1200,
    taxes: 108,
    discount: 150,
    total: 1158
  };

  activeTab = 'card';
  paymentTabs = [
    { id: 'card', label: 'Credit/Debit Card' },
    { id: 'upi', label: 'UPI' },
    { id: 'netbanking', label: 'Net Banking' },
    { id: 'wallet', label: 'Wallet' }
  ];

  // Card Details
  cardDetails = {
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  };

  supportedCards = [
    { type: 'visa', icon: '/assets/Images/visa.png' },
    { type: 'mastercard', icon: '/assets/Images/mastercard.png' },
    { type: 'amex', icon: '/assets/Images/amex.png' },
    { type: 'rupay', icon: '/assets/Images/rupay.png' }
  ];

  // UPI Details
  upiId = '';
  selectedUpiApp = '';
  upiApps = [
    { name: 'GPay', icon: '/assets/Images/gpay.png' },
    { name: 'PhonePe', icon: '/assets/Images/phonepe.png' },
    { name: 'Paytm', icon: '/assets/Images/paytm.png' },
    { name: 'BHIM', icon: '/assets/Images/bhim.png' }
  ];

  // Net Banking
  selectedBank = '';
  banks = [
    { code: 'sbi', name: 'State Bank of India' },
    { code: 'hdfc', name: 'HDFC Bank' },
    { code: 'icici', name: 'ICICI Bank' },
    { code: 'axis', name: 'Axis Bank' },
    { code: 'kotak', name: 'Kotak Mahindra Bank' }
  ];

  // Wallet
  selectedWallet = '';
  wallets = [
    { name: 'Paytm', icon: '/assets/Images/paytm-wallet.png' },
    { name: 'Amazon Pay', icon: '/assets/Images/amazonpay.png' },
    { name: 'MobiKwik', icon: '/assets/Images/mobikwik.png' },
    { name: 'FreeCharge', icon: '/assets/Images/freecharge.png' },
    { name: 'Airtel Money', icon: '/assets/Images/airtel-money.png' },
    { name: 'JioMoney', icon: '/assets/Images/jiomoney.png' }
  ];

  // Contact Info
  contactInfo = {
    email: '',
    mobile: ''
  };

  formatCardNumber() {
    // Remove all non-digit characters
    let value = this.cardDetails.number.replace(/\D/g, '');
    
    // Add space after every 4 digits
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    this.cardDetails.number = value;
  }

  formatExpiry() {
    // Remove all non-digit characters
    let value = this.cardDetails.expiry.replace(/\D/g, '');
    
    // Add slash after 2 digits (MM/YY)
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    
    this.cardDetails.expiry = value;
  }

  isCardType(type: string): boolean {
    if (!this.cardDetails.number) return false;
    
    const firstDigit = this.cardDetails.number.charAt(0);
    switch(type) {
      case 'visa': return firstDigit === '4';
      case 'mastercard': return firstDigit === '5';
      case 'amex': return firstDigit === '3';
      case 'rupay': return firstDigit === '6';
      default: return false;
    }
  }

  selectUpiApp(app: any) {
    this.selectedUpiApp = app.name;
    this.upiId = `${this.contactInfo.mobile}@${app.name.toLowerCase()}`;
  }

  selectWallet(wallet: any) {
    this.selectedWallet = wallet.name;
  }

  makePayment() {
    // Payment processing logic would go here
    console.log('Payment initiated', {
      method: this.activeTab,
      details: this.activeTab === 'card' ? this.cardDetails : 
               this.activeTab === 'upi' ? { upiId: this.upiId, app: this.selectedUpiApp } :
               this.activeTab === 'netbanking' ? { bank: this.selectedBank } :
               { wallet: this.selectedWallet },
      contact: this.contactInfo,
      amount: this.bookingDetails.total
    });
    
    // In a real app, you would call a payment service API here
    alert(`Payment of ₹${this.bookingDetails.total} initiated successfully!`);
  }
}