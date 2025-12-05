import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Film } from "lucide-react";
import svgPaths from "../imports/svg-brtdk8eae1";
import logo from "figma:asset/c551745208ab5a66bd631a9b0efa045b89a039ad.png";

function Logo() {
  return (
    <div className="absolute left-[176px] size-[96px] top-0" data-name="Logo">
      <img src={logo} alt="FilmLot360 Logo" className="w-20 h-20 object-contain" />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[24px] left-0 top-[132px] w-[448px]" data-name="Heading 1">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[224.31px] not-italic text-white text-[16px] text-center text-nowrap top-0 tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">FilmLot360 CRM</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[24px] left-0 top-[164px] w-[448px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[224.53px] not-italic text-gray-400 text-[16px] text-center text-nowrap top-0 tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Film Production Management Platform</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[20px] left-0 top-[196px] w-[448px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[223.63px] not-italic text-purple-400 text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Streamline your production workflow</p>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[220px] left-0 top-0 w-[448px]" data-name="Container">
      <Logo />
      <Heading />
      <Paragraph />
      <Paragraph1 />
    </div>
  );
}

function CardTitle() {
  return (
    <div className="[grid-area:1_/_1] place-self-stretch relative shrink-0" data-name="CardTitle">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[16px] text-white text-nowrap top-0 tracking-[-0.3125px] whitespace-pre">Welcome Back</p>
    </div>
  );
}

function CardDescription() {
  return (
    <div className="[grid-area:2_/_1] place-self-stretch relative shrink-0" data-name="CardDescription">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-gray-400 text-[16px] text-nowrap top-0 tracking-[-0.3125px] whitespace-pre">Sign in to manage your film productions</p>
    </div>
  );
}

function CardHeader() {
  return (
    <div className="absolute box-border gap-[6px] grid grid-cols-[repeat(1,_minmax(0px,_1fr))] grid-rows-[16px_minmax(0px,_1fr)] h-[70px] left-0 pb-0 pt-[24px] px-[24px] top-0 w-[446px]" data-name="CardHeader">
      <CardTitle />
      <CardDescription />
    </div>
  );
}

function PrimitiveButton({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`[grid-area:1_/_1] h-[29px] justify-self-stretch relative rounded-[14px] shrink-0 transition-colors ${active ? 'bg-purple-600' : 'bg-transparent hover:bg-zinc-800'}`} 
      data-name="Primitive.button"
    >
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[29px] items-center justify-center px-[9px] py-[5px] relative w-full">
          <p className={`font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-nowrap tracking-[-0.1504px] whitespace-pre ${active ? 'text-white' : 'text-gray-400'}`}>Sign In</p>
        </div>
      </div>
    </button>
  );
}

function PrimitiveButton1({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`[grid-area:1_/_2] h-[29px] justify-self-stretch relative rounded-[14px] shrink-0 transition-colors ${active ? 'bg-purple-600' : 'bg-transparent hover:bg-zinc-800'}`} 
      data-name="Primitive.button"
    >
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[29px] items-center justify-center px-[9px] py-[5px] relative w-full">
          <p className={`font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-nowrap tracking-[-0.1504px] whitespace-pre ${active ? 'text-white' : 'text-gray-400'}`}>Create Account</p>
        </div>
      </div>
    </button>
  );
}

function TabList({ activeTab, onTabChange }: { activeTab: 'signin' | 'signup'; onTabChange: (tab: 'signin' | 'signup') => void }) {
  return (
    <div className="bg-zinc-800 h-[36px] relative rounded-[14px] shrink-0 w-[398px]" data-name="Tab List">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[36px] px-[3px] py-[3.5px] relative w-[398px]">
        <PrimitiveButton active={activeTab === 'signin'} onClick={() => onTabChange('signin')} />
        <PrimitiveButton1 active={activeTab === 'signup'} onClick={() => onTabChange('signup')} />
      </div>
    </div>
  );
}

function PrimitiveLabel() {
  return (
    <div className="content-stretch flex gap-[8px] h-[14px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] not-italic relative shrink-0 text-[14px] text-gray-300 text-nowrap tracking-[-0.1504px] whitespace-pre">Email</p>
    </div>
  );
}

function Input({ value, onChange, placeholder }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string }) {
  return (
    <div className="bg-zinc-800 border border-white/10 h-[36px] relative rounded-[8px] shrink-0 w-full focus-within:border-purple-500 transition-colors" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[36px] items-center px-[12px] py-[4px] relative w-full">
          <input 
            type="email"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-white text-[14px] tracking-[-0.1504px] bg-transparent border-none outline-none w-full placeholder:text-gray-500"
            required
          />
        </div>
      </div>
    </div>
  );
}

function Container1({ email, onEmailChange }: { email: string; onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[58px] items-start left-0 top-0 w-[398px]" data-name="Container">
      <PrimitiveLabel />
      <Input value={email} onChange={onEmailChange} placeholder="you@example.com" />
    </div>
  );
}

function PrimitiveLabel1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[14px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] not-italic relative shrink-0 text-[14px] text-gray-300 text-nowrap tracking-[-0.1504px] whitespace-pre">Password</p>
    </div>
  );
}

function Input1({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className="bg-zinc-800 border border-white/10 h-[36px] relative rounded-[8px] shrink-0 w-full focus-within:border-purple-500 transition-colors" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[36px] items-center px-[12px] py-[4px] relative w-full">
          <input 
            type="password"
            value={value}
            onChange={onChange}
            placeholder="••••••••"
            className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-white text-[14px] tracking-[-0.1504px] bg-transparent border-none outline-none w-full placeholder:text-gray-500"
            required
          />
        </div>
      </div>
    </div>
  );
}

function Container2({ password, onPasswordChange }: { password: string; onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[58px] items-start left-0 top-[74px] w-[398px]" data-name="Container">
      <PrimitiveLabel1 />
      <Input1 value={password} onChange={onPasswordChange} />
    </div>
  );
}

function Button({ onClick }: { onClick: (e: React.FormEvent) => void }) {
  return (
    <button 
      onClick={onClick}
      type="submit"
      className="absolute bg-gradient-to-r from-purple-600 to-pink-600 h-[36px] left-0 rounded-[8px] top-[148px] w-[398px] hover:shadow-lg hover:shadow-purple-500/50 transition-all cursor-pointer" 
      data-name="Button"
    >
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[199.02px] not-italic text-[14px] text-center text-nowrap text-white top-[8px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Sign In</p>
    </button>
  );
}

function AuthPage() {
  return (
    <div className="absolute left-[118.52px] size-[16px] top-[9px]" data-name="AuthPage">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_2004_94)" id="AuthPage">
          <path d={svgPaths.p30ef7a30} fill="var(--fill-0, #4285F4)" id="Vector" />
          <path d={svgPaths.p35541a00} fill="var(--fill-0, #34A853)" id="Vector_2" />
          <path d={svgPaths.p17176680} fill="var(--fill-0, #FBBC05)" id="Vector_3" />
          <path d={svgPaths.p3683500} fill="var(--fill-0, #EA4335)" id="Vector_4" />
        </g>
        <defs>
          <clipPath id="clip0_2004_94">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button1({ onClick }: { onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      type="button"
      className="absolute bg-zinc-800 border border-white/10 h-[36px] left-0 rounded-[8px] top-[248px] w-[398px] hover:bg-zinc-700 transition-colors cursor-pointer" 
      data-name="Button"
    >
      <AuthPage />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[214.02px] not-italic text-[14px] text-center text-white text-nowrap top-[7px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Sign in with Google</p>
    </button>
  );
}

function Text() {
  return <div className="absolute border-[1px_0px_0px] border-white/10 border-solid h-px left-0 top-[7.5px] w-[398px]" data-name="Text" />;
}

function Text1() {
  return (
    <div className="absolute bg-zinc-900 box-border content-stretch flex h-[16px] items-start left-[132.17px] px-[8px] py-0 top-0 w-[133.656px]" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-gray-500 text-[12px] text-nowrap uppercase whitespace-pre">Or continue with</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[16px] left-0 top-[216px] w-[398px]" data-name="Container">
      <Text />
      <Text1 />
    </div>
  );
}

function AuthPage1({ 
  email, 
  password, 
  onEmailChange, 
  onPasswordChange, 
  onSubmit,
  onGoogleSignIn 
}: { 
  email: string;
  password: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onGoogleSignIn: () => void;
}) {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[398px]" data-name="AuthPage">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full relative w-[398px]">
        <Container1 email={email} onEmailChange={onEmailChange} />
        <Container2 password={password} onPasswordChange={onPasswordChange} />
        <Button onClick={onSubmit} />
        <Button1 onClick={onGoogleSignIn} />
        <Container3 />
      </div>
    </div>
  );
}

function PrimitiveDiv({ 
  activeTab, 
  onTabChange,
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onGoogleSignIn
}: { 
  activeTab: 'signin' | 'signup';
  onTabChange: (tab: 'signin' | 'signup') => void;
  email: string;
  password: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onGoogleSignIn: () => void;
}) {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[328px] items-start left-[24px] top-[94px] w-[398px]" data-name="Primitive.div">
      <TabList activeTab={activeTab} onTabChange={onTabChange} />
      <AuthPage1 
        email={email}
        password={password}
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
        onSubmit={onSubmit}
        onGoogleSignIn={onGoogleSignIn}
      />
    </div>
  );
}

function Card({ 
  activeTab, 
  onTabChange,
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onGoogleSignIn
}: { 
  activeTab: 'signin' | 'signup';
  onTabChange: (tab: 'signin' | 'signup') => void;
  email: string;
  password: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onGoogleSignIn: () => void;
}) {
  return (
    <div className="absolute bg-zinc-900 border border-white/10 border-solid left-0 rounded-[14px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.3),0px_8px_10px_-6px_rgba(0,0,0,0.3)] size-[448px] top-[228px]" data-name="Card">
      <CardHeader />
      <PrimitiveDiv 
        activeTab={activeTab}
        onTabChange={onTabChange}
        email={email}
        password={password}
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
        onSubmit={onSubmit}
        onGoogleSignIn={onGoogleSignIn}
      />
    </div>
  );
}

function BoldText() {
  return (
    <div className="absolute content-stretch flex h-[17px] items-start left-[113.55px] top-[21px] w-[216.891px]" data-name="Bold Text">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-emerald-400 text-[14px] text-center text-nowrap tracking-[-0.1504px] whitespace-pre">🔐 For Google OAuth Reviewers</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[20px] top-[52px] w-[404px]" data-name="Paragraph">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-emerald-300 text-[12px] text-center">Test credentials for Trust and Safety team verification:</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[16px] relative shrink-0 w-[378px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-[378px]">
        <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-emerald-400 text-[12px] text-center">Primary Test Account:</p>
      </div>
    </div>
  );
}

function Code() {
  return (
    <div className="bg-emerald-950 border border-emerald-800 h-[28px] relative rounded-[4px] shrink-0 w-[378px]" data-name="Code">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[378px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[189.2px] not-italic text-emerald-300 text-[14px] text-center text-nowrap top-[5px] translate-x-[-50%] whitespace-pre">admin@filmlot360.com</p>
      </div>
    </div>
  );
}

function Code1() {
  return (
    <div className="basis-0 bg-emerald-950 border border-emerald-800 grow min-h-px min-w-px relative rounded-[4px] shrink-0 w-[378px]" data-name="Code">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full relative w-[378px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[189.14px] not-italic text-emerald-300 text-[14px] text-center text-nowrap top-[5px] translate-x-[-50%] whitespace-pre">password123</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[80px] items-start relative shrink-0 w-full" data-name="Container">
      <Text2 />
      <Code />
      <Code1 />
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[16px] relative shrink-0 w-[378px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-[378px]">
        <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-emerald-400 text-[12px] text-center">Google Reviewer Account:</p>
      </div>
    </div>
  );
}

function Code2() {
  return (
    <div className="bg-emerald-950 border border-emerald-800 h-[28px] relative rounded-[4px] shrink-0 w-[378px]" data-name="Code">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[378px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[188.64px] not-italic text-emerald-300 text-[14px] text-center text-nowrap top-[5px] translate-x-[-50%] whitespace-pre">lysasand.535434@gmail.com</p>
      </div>
    </div>
  );
}

function Code3() {
  return (
    <div className="basis-0 bg-emerald-950 border border-emerald-800 grow min-h-px min-w-px relative rounded-[4px] shrink-0 w-[378px]" data-name="Code">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full relative w-[378px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[188.78px] not-italic text-emerald-300 text-[14px] text-center text-nowrap top-[5px] translate-x-[-50%] whitespace-pre">ReviewTest2024!</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[80px] items-start relative shrink-0 w-full" data-name="Container">
      <Text3 />
      <Code2 />
      <Code3 />
    </div>
  );
}

function Container6() {
  return (
    <div className="box-border content-stretch flex flex-col h-[93px] items-start pb-0 pt-[13px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-emerald-800 border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Container5 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute bg-zinc-900 box-border content-stretch flex flex-col gap-[12px] h-[211px] items-start left-[20px] pb-px pt-[13px] px-[13px] rounded-[4px] top-[80px] w-[404px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-emerald-800 border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container4 />
      <Container6 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute font-['Inter:Regular',sans-serif] font-normal h-[48px] leading-[16px] left-[20px] not-italic text-emerald-400 text-[12px] text-center top-[303px] w-[404px]" data-name="Paragraph">
      <p className="absolute left-[202.22px] top-0 translate-x-[-50%] w-[353px]">Both accounts have full admin access to all features for review purposes.</p>
      <p className="absolute left-[202.16px] text-nowrap top-[32px] translate-x-[-50%] whitespace-pre">The Google Reviewer account is pre-authorized and ready for testing.</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute bg-emerald-950/30 border-2 border-emerald-800 border-solid h-[375px] left-0 rounded-[10px] top-[700px] w-[448px]" data-name="Container">
      <BoldText />
      <Paragraph2 />
      <Container7 />
      <Paragraph3 />
    </div>
  );
}

function Button2() {
  return (
    <button className="absolute content-stretch flex h-[16px] items-start left-[159.03px] top-[1097px] w-[129.922px] hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-none" data-name="Button">
      <p className="[text-underline-position:from-font] decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-gray-500 text-[12px] text-center text-nowrap underline whitespace-pre">Run OAuth Diagnostics</p>
    </button>
  );
}

function LinkComponent() {
  return (
    <a href="#" className="hover:opacity-80 transition-opacity inline" data-name="Link">
      <span className="[text-underline-position:from-font] decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-purple-400 text-[14px] tracking-[0.3px] underline whitespace-nowrap">Terms of Service</span>
    </a>
  );
}

function Link1() {
  return (
    <a href="#" className="hover:opacity-80 transition-opacity inline" data-name="Link">
      <span className="[text-underline-position:from-font] decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-purple-400 text-[14px] tracking-[0.5px] underline whitespace-nowrap">Privacy Policy</span>
    </a>
  );
}

function Paragraph4() {
  return (
    <div className="absolute left-0 top-[1139px] w-[448px] px-4" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-gray-400 text-[14px] text-center tracking-[0.3px] flex flex-wrap items-center justify-center gap-x-1">
        <span>By using this service, you agree to our</span>
        <LinkComponent />
        <span>and</span>
        <Link1 />
      </p>
    </div>
  );
}

function Container9({ 
  activeTab, 
  onTabChange,
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onGoogleSignIn
}: { 
  activeTab: 'signin' | 'signup';
  onTabChange: (tab: 'signin' | 'signup') => void;
  email: string;
  password: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onGoogleSignIn: () => void;
}) {
  return (
    <div className="h-[1179px] relative shrink-0 w-[448px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[1179px] relative w-[448px]">
        <Container />
        <Card 
          activeTab={activeTab}
          onTabChange={onTabChange}
          email={email}
          password={password}
          onEmailChange={onEmailChange}
          onPasswordChange={onPasswordChange}
          onSubmit={onSubmit}
          onGoogleSignIn={onGoogleSignIn}
        />
        <Container8 />
        <Button2 />
        <Paragraph4 />
      </div>
    </div>
  );
}

export function SignIn() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [initializingUsers, setInitializingUsers] = useState(false);
  const [usersInitialized, setUsersInitialized] = useState(false);

  // Auto-initialize test users on component mount
  useEffect(() => {
    const checkAndInitialize = async () => {
      // Check if we've already initialized in this session
      const initialized = sessionStorage.getItem('test_users_initialized');
      if (initialized === 'true') {
        setUsersInitialized(true);
        return;
      }

      // Try to initialize test users silently
      try {
        const { projectId, publicAnonKey } = await import('../utils/supabase/info');
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-b0eae7ae/init-test-users`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`,
            },
          }
        );

        const data = await response.json();
        
        if (data.success) {
          sessionStorage.setItem('test_users_initialized', 'true');
          setUsersInitialized(true);
          console.log('Test users initialized successfully');
        }
      } catch (err) {
        console.log('Could not auto-initialize test users:', err);
      }
    };

    checkAndInitialize();
  }, []);

  const handleTabChange = (tab: 'signin' | 'signup') => {
    setActiveTab(tab);
    if (tab === 'signup') {
      navigate('/signup');
    }
  };

  const handleInitializeTestUsers = async () => {
    setInitializingUsers(true);
    setError('');
    
    try {
      const { projectId, publicAnonKey } = await import('../utils/supabase/info');
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0eae7ae/init-test-users`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();
      
      if (data.success) {
        alert('Test users initialized successfully! You can now sign in with the credentials shown below.');
      } else {
        alert('Failed to initialize test users: ' + (data.error || 'Unknown error'));
      }
    } catch (err: any) {
      alert('Failed to initialize test users: ' + err.message);
    } finally {
      setInitializingUsers(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { createClient } = await import('../utils/supabase/client');
      const supabase = createClient();

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        // Provide helpful error message
        if (signInError.message.includes('Invalid login credentials')) {
          setError('Invalid credentials. Use the test accounts below or create a new account.');
        } else {
          setError(signInError.message);
        }
        console.error('Sign in error:', signInError);
        return;
      }

      if (data.session?.access_token) {
        // Store access token for API calls
        localStorage.setItem('access_token', data.session.access_token);
        console.log('Sign in successful, navigating to subscription page');
        navigate('/dashboard/subscription');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
      console.error('Unexpected sign in error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    
    try {
      const { createClient } = await import('../utils/supabase/client');
      const supabase = createClient();

      const { data, error: signInError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (signInError) {
        setError(signInError.message);
        console.error('Google sign in error:', signInError);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
      console.error('Unexpected Google sign in error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="content-stretch flex items-center justify-center relative size-full min-h-screen overflow-y-auto py-8 bg-zinc-950" data-name="Film Lot 360">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,0,255,0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,0,128,0.15),transparent_50%)]"></div>
      <div className="relative z-10 scale-[0.65] md:scale-90 lg:scale-100 origin-center">
        {error && (
          <div className="absolute top-[-80px] left-0 right-0 bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-400 text-center text-sm">
            {error}
            {error.includes('Invalid credentials') && (
              <div className="mt-2">
                <button
                  type="button"
                  onClick={handleInitializeTestUsers}
                  disabled={initializingUsers}
                  className="px-4 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {initializingUsers ? 'Initializing...' : 'Click Here to Initialize Test Accounts'}
                </button>
              </div>
            )}
          </div>
        )}
        {loading && (
          <div className="absolute top-[-60px] left-0 right-0 bg-purple-500/20 border border-purple-500 rounded-lg p-4 text-purple-400 text-center">
            Signing in...
          </div>
        )}
        <Container9 
          activeTab={activeTab}
          onTabChange={handleTabChange}
          email={email}
          password={password}
          onEmailChange={(e) => setEmail(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onSubmit={handleSubmit}
          onGoogleSignIn={handleGoogleSignIn}
        />
      </div>
    </form>
  );
}