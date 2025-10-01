"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: SelectOption) => {
    onChange(option.value);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white appearance-none cursor-pointer hover:border-gray-500/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 flex items-center justify-between"
      >
        <span className={selectedOption ? "text-white" : "text-gray-400"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-[999999] w-full mt-2 bg-gray-800/95 backdrop-blur-sm border border-gray-600/50 rounded-xl shadow-xl shadow-black/20 overflow-hidden"
          >
            <div className="p-2">
              <input
                type="text"
                placeholder="Search options..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                autoFocus
              />
            </div>
            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className="w-full px-4 py-3 text-left text-white hover:bg-gray-700/50 transition-colors duration-150 flex items-center justify-between"
                  >
                    <span>{option.label}</span>
                    {value === option.value && (
                      <Check className="w-4 h-4 text-blue-400" />
                    )}
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-400 text-center">
                  No options found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
