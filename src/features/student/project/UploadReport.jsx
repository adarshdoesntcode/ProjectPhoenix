import { toast } from "@/components/ui/use-toast";
import { selectCurrentUser } from "@/features/auth/authSlice";

import { Upload } from "antd";
import { FileUp } from "lucide-react";
import { useSelector } from "react-redux";

import { useSubmitReportMutation } from "../studentApiSlice";
import useRefreshToken from "@/hooks/useRefreshToken";
const { Dragger } = Upload;

function UploadReport({ disabled }) {
  const user = useSelector(selectCurrentUser);
  const [submitReport] = useSubmitReportMutation();
  const refresh = useRefreshToken();

  const props = {
    name: "file",
    disabled,
    withCredentials: true,
    accept: ".pdf",
    maxCount: 1,
    showUploadList: {
      showRemoveIcon: false,
    },
    progress: { strokeColor: "black", size: "default" },
    multiple: false,

    beforeUpload: (file) => {
      const isPdf = file.type === "application/pdf";
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isPdf) {
        toast({
          variant: "destructive",
          title: "Invalid File Type",
          description: "Only .pdf files are allowed",
        });
        return Upload.LIST_IGNORE;
      }
      if (!isLt10M) {
        toast({
          variant: "destructive",
          title: "File Too Large",
          description: "File must be smaller than 10MB",
        });
        return Upload.LIST_IGNORE;
      }
      return isPdf && isLt10M;
    },

    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        await submitReport({
          file,
          userProject: user.project,
          SubmittedBy: user.fullname,
          SubmittedOn: new Date(),
        }).unwrap();
        await refresh();
        onSuccess("ok");
        toast({
          title: "Report Submitted Successfully",
          description: file.name,
        });
      } catch (error) {
        onError(error);
        toast({
          variant: "destructive",
          title: "Something Went Wrong",
          description: "Try Again",
        });
      }
    },

    onDrop(e) {
      const files = Array.from(e.dataTransfer.files);
      files.forEach((file) => {
        const isPdf = file.type === "application/pdf";
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isPdf) {
          toast({
            variant: "destructive",
            title: "Invalid File Type",
            description: "Only .pdf files are allowed",
          });
        }
        if (!isLt10M) {
          toast({
            variant: "destructive",
            title: "File Too Large",
            description: "File must be smaller than 10MB",
          });
        }
      });
    },
  };

  return (
    <Dragger {...props}>
      <div className="flex flex-col items-center gap-2 justify-center h-[200px]">
        <FileUp className="w-12 h-12 " />

        <p className="text-lg font-semibold">
          Click or drag Report to this area to upload
        </p>
        <p className="text-xs ">Only .pdf files, MAX SIZE : 10MB</p>
      </div>
    </Dragger>
  );
}

export default UploadReport;
