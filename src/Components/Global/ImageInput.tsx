interface Props {
    children: React.ReactNode;
    handleImageChange?: React.ChangeEventHandler<HTMLInputElement>;
  }
  
  const ImageInput: React.FC<Props> = ({ handleImageChange, children}) => {
    return (
      <>
        <div>
          <label htmlFor="image">
            {children}
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      </>
    );
  };
  
  export default ImageInput;
  