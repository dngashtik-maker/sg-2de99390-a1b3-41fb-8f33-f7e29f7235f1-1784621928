import { useState, ChangeEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, FileText, CheckCircle2, AlertCircle, Download } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Member } from "@/components/MemberCard";

interface ImportedMember extends Partial<Member> {
  rowNumber: number;
  errors: string[];
  warnings: string[];
}

export default function ImportMembers() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importedData, setImportedData] = useState<ImportedMember[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importComplete, setImportComplete] = useState(false);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImportedData([]);
      setImportComplete(false);
    }
  };

  const parseCSV = (text: string): ImportedMember[] => {
    const lines = text.split("\n").filter(line => line.trim());
    if (lines.length < 2) return [];

    const headers = lines[0].split(",").map(h => h.trim().toLowerCase());
    const data: ImportedMember[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map(v => v.trim());
      const errors: string[] = [];
      const warnings: string[] = [];

      const member: ImportedMember = {
        rowNumber: i + 1,
        id: values[headers.indexOf("id")] || `imported-${i}`,
        name: values[headers.indexOf("name")] || "",
        credentials: values[headers.indexOf("credentials")] || "",
        role: values[headers.indexOf("role")] || "",
        company: values[headers.indexOf("company")] || "",
        country: values[headers.indexOf("country")] || "",
        primaryBranch: values[headers.indexOf("primarybranch")] || values[headers.indexOf("primary_branch")] || "",
        email: values[headers.indexOf("email")] || "",
        phone: values[headers.indexOf("phone")] || "",
        category: (values[headers.indexOf("category")] as "Staff" | "Board" | "Volunteer") || "Staff",
        photoUrl: values[headers.indexOf("photourl")] || values[headers.indexOf("photo_url")] || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
        joinDate: values[headers.indexOf("joindate")] || values[headers.indexOf("join_date")] || new Date().toISOString().split("T")[0],
        status: (values[headers.indexOf("status")] as "Active" | "Inactive") || "Active",
        cpdPoints2024: parseInt(values[headers.indexOf("cpdpoints2024")] || values[headers.indexOf("cpd_points_2024")] || "0"),
        cpdPoints2025: parseInt(values[headers.indexOf("cpdpoints2025")] || values[headers.indexOf("cpd_points_2025")] || "0"),
        errors: [],
        warnings: [],
      };

      if (!member.name) errors.push("Name is required");
      if (!member.email) errors.push("Email is required");
      if (!member.credentials) warnings.push("Credentials missing");
      if (!member.role) warnings.push("Role missing");
      if (!member.country) warnings.push("Country missing");

      member.errors = errors;
      member.warnings = warnings;
      data.push(member);
    }

    return data;
  };

  const parseXML = (text: string): ImportedMember[] => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "text/xml");
    const members = xmlDoc.getElementsByTagName("member");
    const data: ImportedMember[] = [];

    for (let i = 0; i < members.length; i++) {
      const memberNode = members[i];
      const errors: string[] = [];
      const warnings: string[] = [];

      const getValue = (tagName: string) => {
        const element = memberNode.getElementsByTagName(tagName)[0];
        return element?.textContent?.trim() || "";
      };

      const member: ImportedMember = {
        rowNumber: i + 1,
        id: getValue("id") || `imported-${i}`,
        name: getValue("name"),
        credentials: getValue("credentials"),
        role: getValue("role"),
        company: getValue("company"),
        country: getValue("country"),
        primaryBranch: getValue("primaryBranch") || getValue("primary_branch"),
        email: getValue("email"),
        phone: getValue("phone"),
        category: (getValue("category") as "Staff" | "Board" | "Volunteer") || "Staff",
        photoUrl: getValue("photoUrl") || getValue("photo_url") || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
        joinDate: getValue("joinDate") || getValue("join_date") || new Date().toISOString().split("T")[0],
        status: (getValue("status") as "Active" | "Inactive") || "Active",
        cpdPoints2024: parseInt(getValue("cpdPoints2024") || getValue("cpd_points_2024") || "0"),
        cpdPoints2025: parseInt(getValue("cpdPoints2025") || getValue("cpd_points_2025") || "0"),
        errors: [],
        warnings: [],
      };

      if (!member.name) errors.push("Name is required");
      if (!member.email) errors.push("Email is required");
      if (!member.credentials) warnings.push("Credentials missing");
      if (!member.role) warnings.push("Role missing");
      if (!member.country) warnings.push("Country missing");

      member.errors = errors;
      member.warnings = warnings;
      data.push(member);
    }

    return data;
  };

  const handleProcessFile = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    const text = await selectedFile.text();

    let data: ImportedMember[] = [];
    if (selectedFile.name.endsWith(".csv")) {
      data = parseCSV(text);
    } else if (selectedFile.name.endsWith(".xml")) {
      data = parseXML(text);
    }

    setImportedData(data);
    setIsProcessing(false);
  };

  const handleConfirmImport = () => {
    const validMembers = importedData.filter(m => m.errors.length === 0);
    console.log("Importing members:", validMembers);
    setImportComplete(true);
  };

  const downloadTemplate = (format: "csv" | "xml") => {
    let content = "";
    let filename = "";

    if (format === "csv") {
      content = "name,credentials,role,company,country,primaryBranch,email,phone,category,photoUrl,joinDate,status,cpdPoints2024,cpdPoints2025\n";
      content += "John Doe,FCIArb,Commercial Arbitrator,Doe Chambers,United Kingdom,London Branch,j.doe@example.com,+44-555-0000,Staff,https://example.com/photo.jpg,2024-01-01,Active,100,50\n";
      filename = "member-import-template.csv";
    } else {
      content = `<?xml version="1.0" encoding="UTF-8"?>
<members>
  <member>
    <name>John Doe</name>
    <credentials>FCIArb</credentials>
    <role>Commercial Arbitrator</role>
    <company>Doe Chambers</company>
    <country>United Kingdom</country>
    <primaryBranch>London Branch</primaryBranch>
    <email>j.doe@example.com</email>
    <phone>+44-555-0000</phone>
    <category>Staff</category>
    <photoUrl>https://example.com/photo.jpg</photoUrl>
    <joinDate>2024-01-01</joinDate>
    <status>Active</status>
    <cpdPoints2024>100</cpdPoints2024>
    <cpdPoints2025>50</cpdPoints2025>
  </member>
</members>`;
      filename = "member-import-template.xml";
    }

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const validCount = importedData.filter(m => m.errors.length === 0).length;
  const errorCount = importedData.filter(m => m.errors.length > 0).length;
  const warningCount = importedData.filter(m => m.warnings.length > 0 && m.errors.length === 0).length;

  return (
    <>
      <SEO
        title="Import Members - Admin Dashboard"
        description="Import member data from CSV or XML files"
      />
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="mb-6">
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="sm" className="font-sans mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="font-sans font-bold text-3xl text-foreground mb-2">
              Import Members
            </h1>
            <p className="font-sans text-sm text-muted-foreground">
              Upload CSV or XML files to bulk import member data
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card className="p-6">
                <h2 className="font-sans font-semibold text-lg text-foreground mb-4">
                  Upload File
                </h2>

                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="font-sans text-sm text-foreground mb-2">
                      Drop file here or click to browse
                    </p>
                    <p className="font-sans text-xs text-muted-foreground mb-4">
                      CSV or XML files only
                    </p>
                    <input
                      type="file"
                      accept=".csv,.xml"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button variant="outline" size="sm" className="font-sans" asChild>
                        <span>
                          <FileText className="w-4 h-4 mr-2" />
                          Select File
                        </span>
                      </Button>
                    </label>
                  </div>

                  {selectedFile && (
                    <Alert>
                      <FileText className="w-4 h-4" />
                      <AlertDescription className="font-sans text-sm">
                        <strong>{selectedFile.name}</strong>
                        <br />
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </AlertDescription>
                    </Alert>
                  )}

                  {selectedFile && !importedData.length && (
                    <Button
                      onClick={handleProcessFile}
                      disabled={isProcessing}
                      className="w-full font-sans"
                    >
                      {isProcessing ? "Processing..." : "Process File"}
                    </Button>
                  )}

                  {importedData.length > 0 && !importComplete && (
                    <Button
                      onClick={handleConfirmImport}
                      disabled={errorCount > 0}
                      className="w-full font-sans"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Confirm Import ({validCount} members)
                    </Button>
                  )}

                  {importComplete && (
                    <Alert>
                      <CheckCircle2 className="w-4 h-4" />
                      <AlertDescription className="font-sans text-sm">
                        <strong>Import Complete!</strong>
                        <br />
                        {validCount} members imported successfully
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="font-sans font-semibold text-sm text-foreground mb-3">
                    Download Templates
                  </h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadTemplate("csv")}
                      className="w-full font-sans justify-start"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      CSV Template
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadTemplate("xml")}
                      className="w-full font-sans justify-start"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      XML Template
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-2">
              {importedData.length > 0 && (
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-sans font-semibold text-lg text-foreground">
                      Preview ({importedData.length} records)
                    </h2>
                    <div className="flex gap-2">
                      {validCount > 0 && (
                        <Badge variant="default" className="font-sans">
                          {validCount} Valid
                        </Badge>
                      )}
                      {warningCount > 0 && (
                        <Badge variant="secondary" className="font-sans">
                          {warningCount} Warnings
                        </Badge>
                      )}
                      {errorCount > 0 && (
                        <Badge variant="destructive" className="font-sans">
                          {errorCount} Errors
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-sans">Row</TableHead>
                          <TableHead className="font-sans">Name</TableHead>
                          <TableHead className="font-sans">Credentials</TableHead>
                          <TableHead className="font-sans">Role</TableHead>
                          <TableHead className="font-sans">Country</TableHead>
                          <TableHead className="font-sans">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {importedData.map((member, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-sans tabular-nums">
                              {member.rowNumber}
                            </TableCell>
                            <TableCell className="font-sans">
                              <div>
                                {member.name}
                                {member.errors.length > 0 && (
                                  <div className="flex items-start gap-1 mt-1">
                                    <AlertCircle className="w-3 h-3 text-destructive flex-shrink-0 mt-0.5" />
                                    <span className="text-xs text-destructive">
                                      {member.errors.join(", ")}
                                    </span>
                                  </div>
                                )}
                                {member.warnings.length > 0 && member.errors.length === 0 && (
                                  <div className="flex items-start gap-1 mt-1">
                                    <AlertCircle className="w-3 h-3 text-amber-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-xs text-amber-600">
                                      {member.warnings.join(", ")}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="font-sans">
                              {member.credentials || "-"}
                            </TableCell>
                            <TableCell className="font-sans">
                              {member.role || "-"}
                            </TableCell>
                            <TableCell className="font-sans">
                              {member.country || "-"}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={member.errors.length > 0 ? "destructive" : "default"}
                                className="font-sans text-xs"
                              >
                                {member.errors.length > 0 ? "Invalid" : "Valid"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </Card>
              )}

              {importedData.length === 0 && (
                <Card className="p-12 text-center">
                  <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-sans font-semibold text-lg text-foreground mb-2">
                    No File Selected
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground">
                    Upload a CSV or XML file to preview member data
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}