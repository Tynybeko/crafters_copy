import React, { useState } from 'react';

const InputFile = React.forwardRef<HTMLInputElement, { onChange: (file: File) => void; name?: string; image?: string }>(
  ({ onChange, image, name, ...props }, ref) => {
      const [previewImage, setPreviewImage] = useState<string | undefined>('');
      
      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                  const imageUrl = reader.result as string;
                  setPreviewImage(imageUrl);
                  onChange(file);
              };
              reader.readAsDataURL(file);
          }
      };
      
      return (
        <label style={{
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundImage: `url(${previewImage || '/images/no-photo.png'})`
        }} className={"border cursor-pointer w-[100%] h-[100%] border-input rounded-[32px] flex items-center gap-[12px]"}>
            <input type="file" name={name} hidden ref={ref} onChange={handleFileChange} {...props} />
        </label>
      );
  }
);

InputFile.displayName = 'InputFile';

export { InputFile };