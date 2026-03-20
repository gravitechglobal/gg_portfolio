"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle2, ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { courses } from "@/data/courseData";
import { isValidPhoneNumber, getCountries, getCountryCallingCode } from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface EnquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
}



// Custom Aesthetic Dropdown Component
function CustomDropdown({ 
    options, 
    value, 
    onChange, 
    placeholder, 
    hasError,
    disabled,
    renderOption,
    dropdownWidth = "100%"
}: { 
    options: any[], 
    value: string, 
    onChange: (val: string) => void, 
    placeholder: string,
    hasError?: boolean,
    disabled?: boolean,
    renderOption?: (opt: any) => React.ReactNode,
    dropdownWidth?: string | number
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} style={{ position: "relative", width: "100%" }}>
            <button
                type="button"
                disabled={disabled}
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.75rem",
                    borderRadius: "var(--radius-md)",
                    border: `1px solid ${hasError ? '#ef4444' : 'var(--glass-border)'}`,
                    background: "var(--surface)",
                    color: value ? "var(--text-primary)" : "var(--text-muted)",
                    outline: "none",
                    cursor: disabled ? "not-allowed" : "pointer",
                    fontSize: "0.95rem",
                    textAlign: "left"
                }}
            >
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {value ? (renderOption ? renderOption(value) : value) : placeholder}
                </span>
                <ChevronDown size={16} style={{ color: "var(--text-muted)", transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        style={{
                            position: "absolute",
                            top: "calc(100% + 8px)",
                            left: 0,
                            width: dropdownWidth,
                            maxHeight: "220px",
                            overflowY: "auto",
                            background: "var(--bg-secondary)",
                            border: "1px solid var(--glass-border)",
                            borderRadius: "var(--radius-md)",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                            zIndex: 10000,
                            padding: "0.5rem"
                        }}
                    >
                        {options.map((opt) => (
                            <div
                                key={opt}
                                onClick={() => {
                                    onChange(opt);
                                    setIsOpen(false);
                                }}
                                style={{
                                    padding: "0.6rem 0.75rem",
                                    borderRadius: "var(--radius-sm)",
                                    cursor: "pointer",
                                    color: value === opt ? "var(--text-primary)" : "var(--text-muted)",
                                    background: value === opt ? "var(--surface-hover)" : "transparent",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    fontSize: "0.9rem",
                                    transition: "background 0.2s, color 0.2s"
                                }}
                                onMouseEnter={(e) => {
                                    if (value !== opt) {
                                        e.currentTarget.style.background = "var(--surface)";
                                        e.currentTarget.style.color = "var(--text-primary)";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (value !== opt) {
                                        e.currentTarget.style.background = "transparent";
                                        e.currentTarget.style.color = "var(--text-muted)";
                                    }
                                }}
                            >
                                <span>{renderOption ? renderOption(opt) : opt}</span>
                                {value === opt && <Check size={14} style={{ color: "var(--accent)" }} />}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        country: "IN",
        nationalPhone: "",
        profession: "",
        selectedCourses: [] as string[],
    });

    const [errors, setErrors] = useState({
        email: "",
        phone: "",
        courses: "",
        profession: "",
    });

    const toggleCourse = (title: string) => {
        setFormData((prev) => {
            if (prev.selectedCourses.includes(title)) {
                return { ...prev, selectedCourses: prev.selectedCourses.filter(c => c !== title) };
            } else {
                return { ...prev, selectedCourses: [...prev.selectedCourses, title] };
            }
        });
        setErrors(prev => ({ ...prev, courses: "" }));
    };

    const validateForm = () => {
        let valid = true;
        let newErrors = { email: "", phone: "", courses: "", profession: "" };

        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
            valid = false;
        }

        const fullPhone = `+${getCountryCallingCode(formData.country as any)}${formData.nationalPhone}`;
        if (!formData.nationalPhone || !isValidPhoneNumber(fullPhone)) {
            newErrors.phone = `Please enter a valid phone number for +${getCountryCallingCode(formData.country as any)}.`;
            valid = false;
        }

        if (!formData.profession) {
            newErrors.profession = "Please select your profession.";
            valid = false;
        }

        if (formData.selectedCourses.length === 0) {
            newErrors.courses = "Please select at least one course.";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setStatus("loading");

        try {
            const fullPhone = `+${getCountryCallingCode(formData.country as any)} ${formData.nationalPhone}`;
            const payload = {
                name: formData.name,
                email: formData.email,
                phone: fullPhone,
                profession: formData.profession,
                course: formData.selectedCourses.join(", "),
            };

            const response = await fetch("/api/enquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error("Failed to submit");
            
            setStatus("success");
            setTimeout(() => {
                onClose();
                setTimeout(() => setStatus("idle"), 500);
                setFormData({ name: "", email: "", country: "IN", nationalPhone: "", profession: "", selectedCourses: [] });
                setErrors({ email: "", phone: "", courses: "", profession: "" });
            }, 3000);
        } catch (error) {
            console.error(error);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={status !== "loading" ? onClose : undefined}
                        style={{
                            position: "fixed",
                            inset: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            backdropFilter: "blur(6px)",
                            zIndex: 9998,
                        }}
                    />

                    {/* Modal container */}
                    <div
                        style={{
                            position: "fixed",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 9999,
                            pointerEvents: "none",
                            padding: "1rem",
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="glass-card"
                            style={{
                                width: "100%",
                                maxWidth: 500,
                                margin: "auto",
                                pointerEvents: "auto",
                                position: "relative",
                                overflow: "visible", // Allowed visible for custom dropdowns to pop cleanly
                                display: "flex",
                                flexDirection: "column",
                                maxHeight: "90vh",
                                background: "var(--bg-secondary)",
                                boxShadow: "0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
                            }}
                        >
                            {/* Header */}
                            <div style={{
                                padding: "1.5rem",
                                borderBottom: "1px solid var(--glass-border)",
                                textAlign: "center",
                                background: "var(--surface)",
                                borderTopLeftRadius: "var(--radius-lg)",
                                borderTopRightRadius: "var(--radius-lg)"
                            }}>
                                <h3 style={{ margin: 0, fontSize: "1.25rem", color: "var(--text-primary)" }}>Enquire Now</h3>
                                <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                                    Fill out the form below and our team will get back to you.
                                </p>
                            </div>

                            {/* Form Area */}
                            {status === "success" ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }} 
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{ 
                                        padding: "3rem", 
                                        textAlign: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: "1rem"
                                    }}
                                >
                                    <CheckCircle2 size={64} style={{ color: "var(--accent)" }} />
                                    <h3 style={{ margin: 0, color: "var(--text-primary)" }}>Inquiry Sent!</h3>
                                    <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.9rem" }}>
                                        Thank you for reaching out. We will contact you soon.
                                    </p>
                                </motion.div>
                            ) : (
                                <div style={{ overflowY: "auto", padding: "1.5rem" }}>
                                    <form id="enquiry-form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                                        
                                        <div>
                                            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", color: "var(--text-primary)" }}>Full Name <span style={{color:"#ef4444"}}>*</span></label>
                                            <input 
                                                required 
                                                type="text" 
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={e => setFormData({...formData, name: e.target.value})}
                                                disabled={status === "loading"}
                                                style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-md)", border: "1px solid var(--glass-border)", background: "var(--surface)", color: "white", outline: "none", fontSize: "0.95rem" }}
                                            />
                                        </div>

                                        <div>
                                            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", color: "var(--text-primary)" }}>Email <span style={{color:"#ef4444"}}>*</span></label>
                                            <input 
                                                required 
                                                type="email" 
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={e => {
                                                    setFormData({...formData, email: e.target.value});
                                                    if (errors.email) setErrors({...errors, email: ""});
                                                }}
                                                disabled={status === "loading"}
                                                style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-md)", border: `1px solid ${errors.email ? '#ef4444' : 'var(--glass-border)'}`, background: "var(--surface)", color: "white", outline: "none", fontSize: "0.95rem" }}
                                            />
                                            {errors.email && <span style={{color:"#ef4444", fontSize:"0.75rem", marginTop:"4px", display:"block"}}>{errors.email}</span>}
                                        </div>
                                        
                                        <div>
                                            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", color: "var(--text-primary)" }}>Contact No <span style={{color:"#ef4444"}}>*</span></label>
                                            <div style={{ 
                                                display: "flex", 
                                                width: "100%", 
                                                borderRadius: "var(--radius-md)", 
                                                border: `1px solid ${errors.phone ? '#ef4444' : 'var(--glass-border)'}`, 
                                                background: "var(--surface)", 
                                            }}>
                                                <div style={{ width: "120px", display: "flex", borderRight: "1px solid var(--glass-border)" }}>
                                                    <CustomDropdown 
                                                        options={getCountries()}
                                                        value={formData.country}
                                                        onChange={(val) => {
                                                            setFormData({...formData, country: val});
                                                            setErrors(prev => ({ ...prev, phone: "" }));
                                                        }}
                                                        disabled={status === "loading"}
                                                        placeholder="Code"
                                                        dropdownWidth="280px"
                                                        renderOption={(code) => `${code} (+${getCountryCallingCode(code as any)})`}
                                                    />
                                                </div>
                                                
                                                <div style={{ display: "flex", alignItems: "center", paddingLeft: "0.75rem", color: "var(--text-muted)", fontSize: "0.95rem" }}>
                                                    +{getCountryCallingCode(formData.country as any)}
                                                </div>
                                                
                                                <input 
                                                    required
                                                    type="tel"
                                                    value={formData.nationalPhone}
                                                    onChange={(e) => {
                                                        const val = e.target.value.replace(/\D/g, '');
                                                        setFormData({...formData, nationalPhone: val});
                                                        setErrors(prev => ({ ...prev, phone: "" }));
                                                    }}
                                                    placeholder="9876543210"
                                                    disabled={status === "loading"}
                                                    style={{ 
                                                        flex: 1, 
                                                        padding: "0.75rem 0.5rem", 
                                                        background: "transparent", 
                                                        color: "white", 
                                                        border: "none", 
                                                        outline: "none", 
                                                        fontSize: "0.95rem",
                                                        width: "100%"
                                                    }}
                                                />
                                            </div>
                                            {errors.phone && <span style={{color:"#ef4444", fontSize:"0.75rem", marginTop:"4px", display:"block"}}>{errors.phone}</span>}
                                        </div>

                                        <div>
                                            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", color: "var(--text-primary)" }}>Profession <span style={{color:"#ef4444"}}>*</span></label>
                                            <CustomDropdown 
                                                options={["Student", "Working Professional", "Other"]}
                                                value={formData.profession}
                                                onChange={(val) => {
                                                    setFormData({...formData, profession: val});
                                                    setErrors(prev => ({ ...prev, profession: "" }));
                                                }}
                                                hasError={!!errors.profession}
                                                disabled={status === "loading"}
                                                placeholder="Select Profession"
                                            />
                                            {errors.profession && <span style={{color:"#ef4444", fontSize:"0.75rem", marginTop:"4px", display:"block"}}>{errors.profession}</span>}
                                        </div>

                                        <div>
                                            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", color: "var(--text-primary)" }}>Recommended Course to Enquire (Multi-select) <span style={{color:"#ef4444"}}>*</span></label>
                                            
                                            <div style={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: "0.5rem",
                                                maxHeight: "150px",
                                                overflowY: "auto",
                                                padding: "0.5rem",
                                                border: `1px solid ${errors.courses ? '#ef4444' : 'var(--glass-border)'}`,
                                                borderRadius: "var(--radius-md)",
                                                background: "var(--surface)"
                                            }}>
                                                {courses.map(course => {
                                                    const isSelected = formData.selectedCourses.includes(course.title);
                                                    return (
                                                        <button
                                                            key={course.id}
                                                            type="button"
                                                            onClick={() => toggleCourse(course.title)}
                                                            disabled={status === "loading"}
                                                            style={{
                                                                background: isSelected ? "var(--accent)" : "rgba(255,255,255,0.05)",
                                                                color: isSelected ? "white" : "var(--text-muted)",
                                                                border: `1px solid ${isSelected ? "var(--accent)" : "var(--glass-border)"}`,
                                                                padding: "4px 10px",
                                                                borderRadius: "20px",
                                                                fontSize: "0.8rem",
                                                                cursor: "pointer",
                                                                transition: "all 0.2s"
                                                            }}
                                                        >
                                                            {course.title}
                                                        </button>
                                                    );
                                                })}
                                                <button
                                                    type="button"
                                                    disabled={status === "loading"}
                                                    onClick={() => toggleCourse("General Query")}
                                                    style={{
                                                        background: formData.selectedCourses.includes("General Query") ? "var(--accent)" : "rgba(255,255,255,0.05)",
                                                        color: formData.selectedCourses.includes("General Query") ? "white" : "var(--text-muted)",
                                                        border: `1px solid ${formData.selectedCourses.includes("General Query") ? "var(--accent)" : "var(--glass-border)"}`,
                                                        padding: "4px 10px",
                                                        borderRadius: "20px",
                                                        fontSize: "0.8rem",
                                                        cursor: "pointer",
                                                        transition: "all 0.2s"
                                                    }}
                                                >
                                                    General Query
                                                </button>
                                            </div>
                                            {errors.courses && <span style={{color:"#ef4444", fontSize:"0.75rem", marginTop:"4px", display:"block"}}>{errors.courses}</span>}
                                        </div>

                                        {status === "error" && (
                                            <p style={{ color: "#ef4444", fontSize: "0.85rem", margin: 0, textAlign: "center", background: "rgba(239, 68, 68, 0.1)", padding: "0.5rem", borderRadius: "var(--radius-sm)" }}>
                                                Something went wrong. Please check your connection and try again.
                                            </p>
                                        )}
                                    </form>
                                </div>
                            )}

                            {/* Footer */}
                            {status !== "success" && (
                                <div style={{
                                    padding: "1.25rem 1.5rem",
                                    borderTop: "1px solid var(--glass-border)",
                                    background: "var(--surface)",
                                    borderBottomLeftRadius: "var(--radius-lg)",
                                    borderBottomRightRadius: "var(--radius-lg)",
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "0.75rem"
                                }}>
                                    <button 
                                        type="button" 
                                        onClick={onClose}
                                        disabled={status === "loading"}
                                        className="btn-ghost"
                                        style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        form="enquiry-form"
                                        disabled={status === "loading"}
                                        className="btn-primary"
                                        style={{ padding: "0.5rem 1.5rem", fontSize: "0.9rem", minWidth: 140, display: "flex", justifyContent: "center" }}
                                    >
                                        {status === "loading" ? (
                                            <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                                        ) : (
                                            <>
                                                Submit <Send size={14} />
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
