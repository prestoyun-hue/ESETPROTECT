import React, { useState, FormEvent, useEffect } from 'react';
import { Send, Mail, Phone, Building, User, Hash, MessageSquare, Loader2, CheckCircle } from 'lucide-react';
import { solutions } from '../data/solutions';
import { ContactFormData } from '../types';

interface ContactFormProps {
  selectedSolution?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ selectedSolution }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    solution: solutions[0].name,
    quantity: '',
    companyName: '',
    contactName: '',
    phone: '',
    email: '',
    remarks: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Update selected solution if passed from parent
  useEffect(() => {
    if (selectedSolution) {
      setFormData(prev => ({
        ...prev,
        solution: selectedSolution
      }));
    }
  }, [selectedSolution]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Google Apps Script 배포 URL
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxGZZgxUM2JL4xVor8GpI0MFF2-bSp886cGO9hmBL8Wx6APieBp15ykhTFddc3RnyW1/exec"; 

    try {
      // Google Apps Script Web App으로 데이터 전송
      // mode: 'no-cors'는 브라우저 보안 정책(CORS)을 우회하기 위해 필요하며, 
      // 이 경우 response를 읽을 수 없지만 데이터는 전송됩니다.
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toLocaleString()
        }),
        mode: 'no-cors', 
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setStatus('success');
      setFormData({
        solution: solutions[0].name,
        quantity: '',
        companyName: '',
        contactName: '',
        phone: '',
        email: '',
        remarks: ''
      });
      
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      alert('전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주시거나 전화로 문의 부탁드립니다.');
    }
  };

  if (status === 'success') {
    return (
      <section id="contact" className="py-24 bg-eset-light/50 scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-12 border border-slate-100 text-center animate-fade-in-up">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-4">문의가 정상적으로 접수되었습니다!</h3>
            <p className="text-lg text-slate-600 mb-8">
              담당자가 내용을 확인 후 <strong>{formData.email || '입력하신 이메일'}</strong> 또는 
              <strong> {formData.phone || '연락처'}</strong>로 신속하게 연락드리겠습니다.
            </p>
            <button 
              onClick={() => setStatus('idle')}
              className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
            >
              다른 문의 하기
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 bg-eset-light/50 scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">도입 문의 및 상담</h2>
            <p className="text-slate-600">
              전문 컨설턴트가 귀사의 환경에 맞는 최적의 보안 솔루션을 제안해 드립니다.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10 border border-slate-100 relative overflow-hidden">
            {status === 'submitting' && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-eset-teal animate-spin mb-4" />
                <p className="text-lg font-bold text-slate-700">문의 내용을 전송 중입니다...</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Solution Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <ShieldIcon /> 관심 솔루션
                  </label>
                  <select
                    name="solution"
                    value={formData.solution}
                    onChange={handleChange}
                    className="w-full rounded-lg border-slate-200 p-3 focus:ring-2 focus:ring-eset-teal focus:border-transparent transition bg-slate-50"
                  >
                    {solutions.map(s => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Hash size={16} /> 예상 수량 (Users/Endpoints)
                  </label>
                  <input
                    type="text"
                    name="quantity"
                    required
                    placeholder="예: 50, 100"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full rounded-lg border-slate-200 p-3 focus:ring-2 focus:ring-eset-teal focus:border-transparent transition bg-slate-50"
                  />
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Building size={16} /> 회사명
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    placeholder="회사명을 입력하세요"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full rounded-lg border-slate-200 p-3 focus:ring-2 focus:ring-eset-teal focus:border-transparent transition bg-slate-50"
                  />
                </div>

                {/* Contact Name */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <User size={16} /> 담당자 이름
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    required
                    placeholder="담당자 성함을 입력하세요"
                    value={formData.contactName}
                    onChange={handleChange}
                    className="w-full rounded-lg border-slate-200 p-3 focus:ring-2 focus:ring-eset-teal focus:border-transparent transition bg-slate-50"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Phone size={16} /> 전화번호
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="010-0000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border-slate-200 p-3 focus:ring-2 focus:ring-eset-teal focus:border-transparent transition bg-slate-50"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Mail size={16} /> 이메일 주소
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="email@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border-slate-200 p-3 focus:ring-2 focus:ring-eset-teal focus:border-transparent transition bg-slate-50"
                  />
                </div>
              </div>

              {/* Remarks */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <MessageSquare size={16} /> 비고 / 문의사항
                </label>
                <textarea
                  name="remarks"
                  rows={4}
                  placeholder="궁금하신 점이나 추가 요청사항을 적어주세요."
                  value={formData.remarks}
                  onChange={handleChange}
                  className="w-full rounded-lg border-slate-200 p-3 focus:ring-2 focus:ring-eset-teal focus:border-transparent transition bg-slate-50 resize-none"
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-eset-teal text-white font-bold py-4 rounded-xl hover:bg-teal-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                  문의하기 (상담 신청)
                </button>
                <p className="text-center text-xs text-slate-400 mt-4">
                  * 버튼을 클릭하면 담당자에게 내용이 전달되며 순차적으로 연락드립니다.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

export default ContactForm;