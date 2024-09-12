import { useState } from "react";
import Icon from "../../Global/Icon";

interface Props {
  tools: string[];
  setTools: (value: string[]) => void; 
}

const TagInput: React.FC<Props> = ({ tools, setTools }) => {
  const [newTool, setNewTool] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault(); 
      const trimmedTool = newTool.trim();
      if (trimmedTool && !tools.includes(trimmedTool)) {
        setTools([...tools, trimmedTool]); 
        setNewTool(""); 
      }
    }
  };

  const handleRemoveTool = (index: number) => {
    setTools(tools.filter((_, i) => i !== index)); 
  };

  return (
    <div>
      <label htmlFor="tools" className="font-sora font-medium text-sm pl-1">Tools Used:</label>
      <div className="flex flex-wrap gap-1 bg-secondary items-center border border-line p-2 py-[.6em] rounded-lg">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="flex items-center gap-1 shadow-lg bg-light border border-line p-1 px-2 pr-1 rounded-full"
          >
            <span className="text-xs">{tool}</span>
            <div
              onClick={() => handleRemoveTool(index)} 
              className="bg-lighter h-5 w-5 flex-center rounded-full cursor-pointer"
            >
              <Icon styles="text-sm">close</Icon>
            </div>
          </div>
        ))}

        <input
          type="text"
          name="tools"
          id="tools"
          placeholder="Enter tools used..."
          className="bg-transparent pl-2 text-sub font-medium placeholder:text-sub text-sm"
          value={newTool}
          onChange={(e) => setNewTool(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
              />
          </div>
          <p className="text-sm text-sub mt-1">Press "Enter" or use a Comma "," to enter multiple tools.</p>
          
    </div>
  );
};

export default TagInput;
