
import { useState } from "react";
import { Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface DomainSuggestion {
  id: string;
  name: string;
  price: number;
  availability: "available" | "premium" | "unavailable";
  selected: boolean;
}

const DomainPurchase = () => {
  const { toast } = useToast();
  const [brandName] = useState("Acme Inc."); // In a real app, this would come from context/props
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock domain suggestions
  const [domains, setDomains] = useState<DomainSuggestion[]>([
    { id: "1", name: "getacme.co", price: 12.99, availability: "available", selected: false },
    { id: "2", name: "acmehq.com", price: 14.99, availability: "available", selected: false },
    { id: "3", name: "tryacme.io", price: 24.99, availability: "available", selected: false },
    { id: "4", name: "joinacme.com", price: 12.99, availability: "available", selected: false },
    { id: "5", name: "acmemail.com", price: 29.99, availability: "premium", selected: false },
    { id: "6", name: "acmesend.io", price: 19.99, availability: "available", selected: false },
    { id: "7", name: "acmeteam.co", price: 11.99, availability: "available", selected: false },
    { id: "8", name: "withacme.com", price: 14.99, availability: "available", selected: false },
    { id: "9", name: "useacme.co", price: 12.99, availability: "available", selected: false },
    { id: "10", name: "acmesales.com", price: 14.99, availability: "unavailable", selected: false },
  ]);
  
  const handleSelect = (id: string) => {
    setDomains(domains.map(domain => 
      domain.id === id 
        ? { ...domain, selected: !domain.selected } 
        : domain
    ));
  };
  
  const handleSelectAll = () => {
    const allSelected = domains.every(d => d.availability === "available" ? d.selected : true);
    setDomains(domains.map(domain => 
      domain.availability === "available" 
        ? { ...domain, selected: !allSelected } 
        : domain
    ));
  };
  
  const handleSetup = () => {
    const selectedDomains = domains.filter(d => d.selected);
    if (selectedDomains.length === 0) {
      toast({
        title: "No domains selected",
        description: "Please select at least one domain to continue",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Domains setup initiated",
      description: `Setting up ${selectedDomains.length} domains for ${brandName}`,
    });
    
    // In a real app, this would trigger the domain setup process and redirect
  };
  
  const totalPrice = domains
    .filter(domain => domain.selected)
    .reduce((sum, domain) => sum + domain.price, 0);
  
  const selectedCount = domains.filter(domain => domain.selected).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Domain Selection</h1>
          <p className="text-muted-foreground mt-1">
            Select domains for your brand ({brandName})
          </p>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Recommended Domains</CardTitle>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Search domains..."
                    className="px-2 py-1 text-sm border rounded-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        id="select-all"
                        checked={domains.every(d => d.availability === "available" ? d.selected : true)}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Domain Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {domains
                    .filter(domain => domain.name.includes(searchQuery))
                    .map(domain => (
                    <TableRow key={domain.id}>
                      <TableCell>
                        <Checkbox
                          checked={domain.selected}
                          disabled={domain.availability !== "available"}
                          onCheckedChange={() => handleSelect(domain.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{domain.name}</TableCell>
                      <TableCell>
                        {domain.availability === "available" && (
                          <span className="inline-flex items-center gap-1 text-green-600">
                            <Check className="h-3.5 w-3.5" />
                            Available
                          </span>
                        )}
                        {domain.availability === "premium" && (
                          <span className="inline-flex items-center gap-1 text-amber-600">
                            <Info className="h-3.5 w-3.5" />
                            Premium
                          </span>
                        )}
                        {domain.availability === "unavailable" && (
                          <span className="text-gray-400">Unavailable</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        ${domain.price.toFixed(2)}/year
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Selected Domains:</span>
                  <span>{selectedCount}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total Annual Cost:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                className="w-full mt-4" 
                disabled={selectedCount === 0}
                onClick={handleSetup}
              >
                Auto-Setup Selected Domains
              </Button>
              
              <p className="text-xs text-muted-foreground mt-4">
                We'll automatically purchase these domains, configure DNS records,
                and set up the necessary inboxes for your cold email campaigns.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DomainPurchase;
