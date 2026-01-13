// import { useSearchParams } from "react-router-dom";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Download, ArrowLeft } from "lucide-react";

// interface PaymentReceiptProps {
//   onBack?: () => void;
// }

// const PaymentReceipt = ({ onBack }: PaymentReceiptProps) => {
//   const [searchParams] = useSearchParams();

//   // Sample data - in real app, fetch based on receipt ID
//   const receiptData = {
//     societyName: "SocietyPay Residency",
//     societyAddress: "123 Main Street, Mumbai",
//     gstin: "NA",
//     pan: "NA",
//     ownerName: searchParams.get("owner") || "Santosh Mahadeo Devkar",
//     tenantName: searchParams.get("tenant") || "Santosh Devkar",
//     receiptNo: searchParams.get("receiptNo") || "BR/329/25-26",
//     receiptDate: searchParams.get("date") || "05-Jan-2026",
//     billNo: searchParams.get("billNo") || "BILL/25-26/354",
//     towerNo: searchParams.get("tower") || "A",
//     flatNo: searchParams.get("flat") || "101",
//     amount: parseFloat(searchParams.get("amount") || "1500"),
//     transactionId: searchParams.get("txnId") || "U-9876543210",
//     billPeriod: searchParams.get("period") || "January 2026",
//     paymentMethod: searchParams.get("method") || "UPI",
//   };

//   const amountInWords = (num: number): string => {
//     const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
//       'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
//     const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    
//     if (num === 0) return 'Zero';
    
//     const convertHundreds = (n: number): string => {
//       if (n < 20) return ones[n];
//       if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
//       return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + convertHundreds(n % 100) : '');
//     };

//     if (num < 1000) return convertHundreds(num) + ' Rupees Only';
//     if (num < 100000) {
//       return convertHundreds(Math.floor(num / 1000)) + ' Thousand' + 
//         (num % 1000 ? ' ' + convertHundreds(num % 1000) : '') + ' Rupees Only';
//     }
//     return convertHundreds(Math.floor(num / 100000)) + ' Lakh' + 
//       (num % 100000 ? ' ' + convertHundreds(Math.floor((num % 100000) / 1000)) + ' Thousand' : '') +
//       (num % 1000 ? ' ' + convertHundreds(num % 1000) : '') + ' Rupees Only';
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   const handleBack = () => {
//     if (onBack) {
//       onBack();
//     } else {
//       window.history.back();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background p-4 md:p-8">
//       {/* Action Buttons - Hidden on print */}
//       <div className="max-w-2xl mx-auto mb-4 flex gap-2 print:hidden">
//         <Button variant="outline" onClick={handleBack}>
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back
//         </Button>
//         <Button onClick={handlePrint} className="ml-auto">
//           <Download className="w-4 h-4 mr-2" />
//           Download / Print
//         </Button>
//       </div>

//       {/* Receipt Card */}
//       <Card className="max-w-2xl mx-auto p-6 md:p-8 bg-card border-2 border-primary/20 print:border-black print:shadow-none">
//         {/* Header */}
//         <div className="text-center border-b-2 border-primary/20 pb-4 mb-6 print:border-black">
//           <h1 className="text-xl md:text-2xl font-bold text-primary uppercase tracking-wide">
//             {receiptData.societyName}
//           </h1>
//           <p className="text-sm text-muted-foreground mt-1">
//             PAN: {receiptData.pan}, {receiptData.societyAddress}
//           </p>
//           <p className="text-sm text-muted-foreground">
//             GSTIN: {receiptData.gstin}
//           </p>
//         </div>

//         {/* Receipt Title */}
//         <div className="text-center mb-6">
//           <h2 className="text-2xl md:text-3xl font-bold text-foreground border-b-4 border-primary inline-block pb-1 px-4">
//             Receipt
//           </h2>
//         </div>

//         {/* Receipt Details Grid */}
//         <div className="grid grid-cols-2 gap-4 mb-6 text-sm md:text-base">
//           <div>
//             <span className="text-muted-foreground">Owner Name:</span>
//             <p className="font-semibold text-foreground">{receiptData.ownerName}</p>
//           </div>
//           <div className="text-right">
//             <span className="text-muted-foreground">Receipt No:</span>
//             <p className="font-semibold text-foreground">{receiptData.receiptNo}</p>
//           </div>
//           <div>
//             <span className="text-muted-foreground">Tenant Name:</span>
//             <p className="font-semibold text-foreground">{receiptData.tenantName}</p>
//           </div>
//           <div className="text-right">
//             <span className="text-muted-foreground">Receipt Date:</span>
//             <p className="font-semibold text-foreground">{receiptData.receiptDate}</p>
//           </div>
//           <div className="col-span-2 text-right">
//             <span className="text-muted-foreground">Bill No:</span>
//             <p className="font-semibold text-foreground">{receiptData.billNo}</p>
//           </div>
//         </div>

//         {/* Receipt Body */}
//         <div className="bg-muted/50 rounded-lg p-4 md:p-6 mb-6 print:bg-gray-100">
//           <p className="text-foreground leading-relaxed">
//             Received with thanks from <span className="font-semibold">{receiptData.tenantName}</span> against 
//             Tower No. <span className="font-semibold">{receiptData.towerNo}</span> Flat No. <span className="font-semibold">{receiptData.flatNo}</span> the 
//             sum of Rupees <span className="font-bold text-primary">₹{receiptData.amount.toLocaleString('en-IN')}</span>/- 
//             (<span className="italic">{amountInWords(receiptData.amount)}</span>) Vide {receiptData.paymentMethod} Transaction 
//             ID <span className="font-mono text-sm bg-primary/10 px-1 rounded">{receiptData.transactionId}</span> drawn on Payment Successful. 
//             towards Monthly Maintenance Charges Bill period of <span className="font-semibold">{receiptData.billPeriod}</span>
//           </p>
//         </div>

//         {/* Amount Highlight */}
//         <div className="flex justify-center mb-6">
//           <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/30 rounded-lg px-6 py-3 text-center">
//             <p className="text-sm text-muted-foreground">Amount Paid</p>
//             <p className="text-2xl md:text-3xl font-bold text-primary">₹{receiptData.amount.toLocaleString('en-IN')}</p>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="border-t-2 border-primary/20 pt-4 print:border-black">
//           <div className="flex justify-between items-end">
//             <div>
//               <p className="text-xs text-muted-foreground italic">
//                 Note: Subject to realisation (in case of payment by cheque)
//               </p>
//             </div>
//             <div className="text-right">
//               <p className="text-sm font-semibold text-foreground mb-8">
//                 FOR {receiptData.societyName.toUpperCase()}
//               </p>
//               <div className="border-t border-dashed border-muted-foreground/50 pt-2">
//                 <p className="text-sm text-muted-foreground">Authorised Signatory</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Electronic Notice */}
//         <div className="mt-6 text-center">
//           <p className="text-xs text-muted-foreground italic">
//             This is an electronically generated document, hence does not require signature
//           </p>
//           <p className="text-xs text-primary font-semibold mt-2">
//             Powered by SocietyPay
//           </p>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default PaymentReceipt;

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";

interface Flat {
  flatNumber: string;
  ownerName: string;
}

interface MaintenanceMonth {
  month: number;
  year: number;
}

interface PaymentData {
  id: string;
  amount: number;
  paidAt: string;
  transactionId: string;
  paymentMode: string;
  maintenanceMonth: MaintenanceMonth;
  flat: Flat;
}

interface PaymentReceiptProps {
  onBack?: () => void; // optional back handler
}

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const PaymentReceipt = ({ onBack }: PaymentReceiptProps) => {
  const [receiptData, setReceiptData] = useState<PaymentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchReceiptData();
  }, []);

  const fetchReceiptData = async () => {
    try {
      setIsLoading(true);
      setHasError(false);
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/receipts/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch payment");

      const data = await response.json();
      if (!data.length || !data[0].payment) throw new Error("No payments found");

      setReceiptData(data[0].payment);
    } catch (err) {
      console.error("Error fetching receipt:", err);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const amountInWords = (num: number): string => {
    const ones = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten",
      "Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
    const tens = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];

    const convert = (n: number): string => {
      if (n < 20) return ones[n];
      if (n < 100) return tens[Math.floor(n/10)] + (n%10 ? " " + ones[n%10] : "");
      return ones[Math.floor(n/100)] + " Hundred" + (n%100 ? " " + convert(n%100) : "");
    };

    if (num < 1000) return convert(num) + " Rupees Only";
    if (num < 100000)
      return convert(Math.floor(num/1000)) + " Thousand" +
        (num%1000 ? " " + convert(num%1000) : "") + " Rupees Only";

    return convert(Math.floor(num/100000)) + " Lakh" +
      (num%100000 ? " " + convert(Math.floor((num%100000)/1000)) + " Thousand" : "") +
      (num%1000 ? " " + convert(num%1000) : "") + " Rupees Only";
  };

  const handleBack = () => {
    if (onBack) {
      onBack(); // use parent handler
    } else {
      window.history.back(); // fallback for direct access
    }
  };

  const handlePrint = () => window.print();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading receipt...</p>
      </div>
    );
  }

  if (hasError || !receiptData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Receipt not found</p>
      </div>
    );
  }

  const receiptDate = receiptData.paidAt
    ? new Date(receiptData.paidAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  const billPeriod = receiptData.maintenanceMonth
    ? `${monthNames[receiptData.maintenanceMonth.month - 1]} ${receiptData.maintenanceMonth.year}`
    : "";

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto mb-4 flex gap-2 print:hidden">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button onClick={handlePrint} className="ml-auto">
          <Download className="w-4 h-4 mr-2" /> Download / Print
        </Button>
      </div>

      <Card className="max-w-2xl mx-auto p-6 md:p-8 border-2 border-primary/20">
        <div className="text-center border-b pb-4 mb-6">
          <h1 className="text-xl font-bold">SocietyPay Residency</h1>
          <p className="text-sm text-muted-foreground">Mumbai, India</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <span className="text-muted-foreground">Owner Name:</span>
            <p className="font-semibold">{receiptData.flat?.ownerName || "-"}</p>
          </div>
          <div className="text-right">
            <span className="text-muted-foreground">Transaction ID:</span>
            <p className="font-semibold">{receiptData.transactionId || "-"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Flat Number:</span>
            <p className="font-semibold">{receiptData.flat?.flatNumber || "-"}</p>
          </div>
          <div className="text-right">
            <span className="text-muted-foreground">Receipt Date:</span>
            <p className="font-semibold">{receiptDate}</p>
          </div>
        </div>

        <div className="bg-muted/50 p-4 mb-6">
          Received with thanks from <b>{receiptData.flat?.ownerName || "-"}</b> for Flat{" "}
          <b>{receiptData.flat?.flatNumber || "-"}</b> the sum of{" "}
          <b>₹{receiptData.amount.toLocaleString("en-IN")}</b> (
          {amountInWords(receiptData.amount)}) via{" "}
          {receiptData.paymentMode || "-"} Transaction ID{" "}
          {receiptData.transactionId || "-"} towards maintenance charges for{" "}
          <b>{billPeriod}</b>.
        </div>

        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/30 rounded-lg px-6 py-3 text-center">
            <p className="text-sm text-muted-foreground">Amount Paid</p>
            <p className="text-2xl md:text-3xl font-bold text-primary">₹{receiptData.amount.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          This is an electronically generated receipt.
        </div>
      </Card>
    </div>
  );
};

export default PaymentReceipt;
