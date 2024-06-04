import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "@/components/ui/use-toast";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { FileUp, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useSubmitReportMutation } from "../studentApiSlice";
import useRefreshUser from "@/hooks/useRefreshUser";
import { Button } from "@/components/ui/button";

function UploadReport({ disabled }) {
  const user = useSelector(selectCurrentUser);
  const [submitReport, { isLoading }] = useSubmitReportMutation();
  const refreshUser = useRefreshUser();
  const [isUploading, setIsUploading] = useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles.length > 1) {
      toast({
        variant: "destructive",
        title: "Multiple Files Detected",
        description: "Please upload only one file",
      });
      return;
    }
    rejectedFiles.forEach(({ file, errors }) => {
      errors.forEach((error) => {
        if (error.code === "file-invalid-type") {
          toast({
            variant: "destructive",
            title: "Invalid File Type",
            description: "Only .pdf files are allowed",
          });
        } else if (error.code === "file-too-large") {
          toast({
            variant: "destructive",
            title: "File Too Large",
            description: "File must be smaller than 20MB",
          });
        }
      });
    });

    acceptedFiles.forEach((file) => {
      setFileToUpload(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled,
    accept: { "application/pdf": [".pdf"] },
    maxSize: 20971520, //20mb
    multiple: false,
  });

  const handleConfirmUpload = async (e) => {
    e.stopPropagation();

    if (fileToUpload) {
      try {
        setIsUploading(true);
        await submitReport({
          file: fileToUpload,
          userProject: user.project,
          submittedBy: user.fullname,
          submittedOn: new Date(),
        }).unwrap();

        await refreshUser();
        toast({
          title: "Report Submitted Successfully",
          description: fileToUpload.name,
        });
      } catch (error) {
        setIsUploading(false);
        toast({
          variant: "destructive",
          title: "Something Went Wrong",
          description: "Try Again",
        });
      }
      setFileToUpload(null);
      setIsUploading(false);
    }
  };

  const handleCancelUpload = (e) => {
    e.stopPropagation();
    setFileToUpload(null);
  };
  return (
    <>
      <div
        {...getRootProps()}
        className={`border border-dashed rounded-md p-4 flex flex-col items-center gap-2 justify-center h-[200px] hover:bg-slate-50 transition-all ${
          isDragActive ? "border-black" : "border-gray-400"
        } ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <input {...getInputProps()} />
        <FileUp className="w-12 h-12 " />
        {fileToUpload ? (
          <>
            <p className="text-lg font-semibold">{fileToUpload.path}</p>
            <p className="text-xs text-center text-slate-500 mb-2">
              Your project will be rejected in the defense if incorrect report
              is submited. <br />
              Make sure you upload the correct report file.
            </p>
          </>
        ) : (
          <p className="text-lg font-semibold text-center">
            {isDragActive
              ? "Drop your report here ..."
              : "Click or drag Report to this area to upload"}
          </p>
        )}

        {fileToUpload ? (
          <div className="flex gap-4">
            {!isUploading && !isLoading ? (
              <Button variant="secondary" onClick={handleCancelUpload}>
                Clear
              </Button>
            ) : null}

            {isLoading || isUploading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting..
              </Button>
            ) : (
              <Button onClick={handleConfirmUpload}>Submit</Button>
            )}
          </div>
        ) : (
          <p className="text-xs">Only .pdf files, MAX SIZE: 20MB</p>
        )}
      </div>
    </>
  );
}

export default UploadReport;
