import svgPaths from "./svg-brtdk8eae1";
import imgLogo from "figma:asset/c551745208ab5a66bd631a9b0efa045b89a039ad.png";

function Logo() {
  return (
    <div className="absolute left-[176px] size-[96px] top-0" data-name="Logo">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgLogo} />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[24px] left-0 top-[112px] w-[448px]" data-name="Heading 1">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[224.31px] not-italic text-[#101828] text-[16px] text-center text-nowrap top-0 tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">FilmLot360 CRM</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[24px] left-0 top-[144px] w-[448px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[224.53px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-0 tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Film Production Management Platform</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[20px] left-0 top-[176px] w-[448px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[223.63px] not-italic text-[#9810fa] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Streamline your production workflow</p>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[196px] left-0 top-0 w-[448px]" data-name="Container">
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
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[16px] text-neutral-950 text-nowrap top-0 tracking-[-0.3125px] whitespace-pre">Welcome Back</p>
    </div>
  );
}

function CardDescription() {
  return (
    <div className="[grid-area:2_/_1] place-self-stretch relative shrink-0" data-name="CardDescription">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#717182] text-[16px] text-nowrap top-0 tracking-[-0.3125px] whitespace-pre">Sign in to manage your film productions</p>
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

function PrimitiveButton() {
  return (
    <div className="[grid-area:1_/_1] bg-white h-[29px] justify-self-stretch relative rounded-[14px] shrink-0" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[29px] items-center justify-center px-[9px] py-[5px] relative w-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">Sign In</p>
        </div>
      </div>
    </div>
  );
}

function PrimitiveButton1() {
  return (
    <div className="[grid-area:1_/_2] h-[29px] justify-self-stretch relative rounded-[14px] shrink-0" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[29px] items-center justify-center px-[9px] py-[5px] relative w-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">Create Account</p>
        </div>
      </div>
    </div>
  );
}

function TabList() {
  return (
    <div className="bg-[#ececf0] h-[36px] relative rounded-[14px] shrink-0 w-[398px]" data-name="Tab List">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[36px] px-[3px] py-[3.5px] relative w-[398px]">
        <PrimitiveButton />
        <PrimitiveButton1 />
      </div>
    </div>
  );
}

function PrimitiveLabel() {
  return (
    <div className="content-stretch flex gap-[8px] h-[14px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">Email</p>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#f3f3f5] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[36px] items-center px-[12px] py-[4px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#717182] text-[14px] text-nowrap tracking-[-0.1504px] whitespace-pre">you@example.com</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[58px] items-start left-0 top-0 w-[398px]" data-name="Container">
      <PrimitiveLabel />
      <Input />
    </div>
  );
}

function PrimitiveLabel1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[14px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">Password</p>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[#f3f3f5] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[36px] items-center px-[12px] py-[4px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#717182] text-[14px] text-nowrap tracking-[-0.1504px] whitespace-pre">••••••••</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[58px] items-start left-0 top-[74px] w-[398px]" data-name="Container">
      <PrimitiveLabel1 />
      <Input1 />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#9810fa] h-[36px] left-0 rounded-[8px] top-[148px] w-[398px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[199.02px] not-italic text-[14px] text-center text-nowrap text-white top-[8px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Sign In</p>
    </div>
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

function Button1() {
  return (
    <div className="absolute bg-white border border-[rgba(0,0,0,0.1)] border-solid h-[36px] left-0 rounded-[8px] top-[248px] w-[398px]" data-name="Button">
      <AuthPage />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[214.02px] not-italic text-[14px] text-center text-neutral-950 text-nowrap top-[7px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Sign in with Google</p>
    </div>
  );
}

function Text() {
  return <div className="absolute border-[1px_0px_0px] border-[rgba(0,0,0,0.1)] border-solid h-px left-0 top-[7.5px] w-[398px]" data-name="Text" />;
}

function Text1() {
  return (
    <div className="absolute bg-white box-border content-stretch flex h-[16px] items-start left-[132.17px] px-[8px] py-0 top-0 w-[133.656px]" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-nowrap uppercase whitespace-pre">Or continue with</p>
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

function AuthPage1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[398px]" data-name="AuthPage">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full relative w-[398px]">
        <Container1 />
        <Container2 />
        <Button />
        <Button1 />
        <Container3 />
      </div>
    </div>
  );
}

function PrimitiveDiv() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[328px] items-start left-[24px] top-[94px] w-[398px]" data-name="Primitive.div">
      <TabList />
      <AuthPage1 />
    </div>
  );
}

function Card() {
  return (
    <div className="absolute bg-white border border-gray-200 border-solid left-0 rounded-[14px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] size-[448px] top-[228px]" data-name="Card">
      <CardHeader />
      <PrimitiveDiv />
    </div>
  );
}

function BoldText() {
  return (
    <div className="absolute content-stretch flex h-[17px] items-start left-[113.55px] top-[21px] w-[216.891px]" data-name="Bold Text">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#0d542b] text-[14px] text-center text-nowrap tracking-[-0.1504px] whitespace-pre">🔐 For Google OAuth Reviewers</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[20px] top-[52px] w-[404px]" data-name="Paragraph">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#016630] text-[12px] text-center">Test credentials for Trust and Safety team verification:</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[16px] relative shrink-0 w-[378px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-[378px]">
        <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#008236] text-[12px] text-center">Primary Test Account:</p>
      </div>
    </div>
  );
}

function Code() {
  return (
    <div className="bg-green-100 h-[28px] relative rounded-[4px] shrink-0 w-[378px]" data-name="Code">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[378px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[189.2px] not-italic text-[#0d542b] text-[14px] text-center text-nowrap top-[5px] translate-x-[-50%] whitespace-pre">admin@filmlot360.com</p>
      </div>
    </div>
  );
}

function Code1() {
  return (
    <div className="basis-0 bg-green-100 grow min-h-px min-w-px relative rounded-[4px] shrink-0 w-[378px]" data-name="Code">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full relative w-[378px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[189.14px] not-italic text-[#0d542b] text-[14px] text-center text-nowrap top-[5px] translate-x-[-50%] whitespace-pre">password123</p>
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
        <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#008236] text-[12px] text-center">Google Reviewer Account:</p>
      </div>
    </div>
  );
}

function Code2() {
  return (
    <div className="bg-green-100 h-[28px] relative rounded-[4px] shrink-0 w-[378px]" data-name="Code">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[378px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[188.64px] not-italic text-[#0d542b] text-[14px] text-center text-nowrap top-[5px] translate-x-[-50%] whitespace-pre">lysasand.535434@gmail.com</p>
      </div>
    </div>
  );
}

function Code3() {
  return (
    <div className="basis-0 bg-green-100 grow min-h-px min-w-px relative rounded-[4px] shrink-0 w-[378px]" data-name="Code">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full relative w-[378px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[188.78px] not-italic text-[#0d542b] text-[14px] text-center text-nowrap top-[5px] translate-x-[-50%] whitespace-pre">ReviewTest2024!</p>
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
      <div aria-hidden="true" className="absolute border-[#b9f8cf] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Container5 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[12px] h-[211px] items-start left-[20px] pb-px pt-[13px] px-[13px] rounded-[4px] top-[80px] w-[404px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#b9f8cf] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container4 />
      <Container6 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute font-['Inter:Regular',sans-serif] font-normal h-[48px] leading-[16px] left-[20px] not-italic text-[#008236] text-[12px] text-center top-[303px] w-[404px]" data-name="Paragraph">
      <p className="absolute left-[202.22px] top-0 translate-x-[-50%] w-[353px]">Both accounts have full admin access to all features for review purposes.</p>
      <p className="absolute left-[202.16px] text-nowrap top-[32px] translate-x-[-50%] whitespace-pre">The Google Reviewer account is pre-authorized and ready for testing.</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute bg-green-50 border-2 border-[#7bf1a8] border-solid h-[375px] left-0 rounded-[10px] top-[700px] w-[448px]" data-name="Container">
      <BoldText />
      <Paragraph2 />
      <Container7 />
      <Paragraph3 />
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[159.03px] top-[1097px] w-[129.922px]" data-name="Button">
      <p className="[text-underline-position:from-font] decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-center text-nowrap underline whitespace-pre">Run OAuth Diagnostics</p>
    </div>
  );
}

function Link() {
  return (
    <div className="absolute content-stretch flex h-[17px] items-start left-[255.38px] top-px w-[108.5px]" data-name="Link">
      <p className="[text-underline-position:from-font] decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#9810fa] text-[14px] text-center text-nowrap tracking-[-0.1504px] underline whitespace-pre">Terms of Service</p>
    </div>
  );
}

function Link1() {
  return (
    <div className="absolute h-[37px] left-[204.75px] top-px w-[237.875px]" data-name="Link">
      <p className="[text-underline-position:from-font] absolute decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[119px] not-italic text-[#9810fa] text-[14px] text-center top-[-1px] tracking-[-0.1504px] translate-x-[-50%] underline w-[238px]">Privacy Policy</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[40px] left-0 top-[1139px] w-[448px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[130.38px] not-italic text-[#4a5565] text-[14px] text-center top-0 tracking-[-0.1504px] translate-x-[-50%] w-[250px]">By using this service, you agree to our</p>
      <Link />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[379.88px] not-italic text-[#4a5565] text-[14px] text-center top-0 tracking-[-0.1504px] translate-x-[-50%] w-[32px]">and</p>
      <Link1 />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[1179px] relative shrink-0 w-[448px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[1179px] relative w-[448px]">
        <Container />
        <Card />
        <Container8 />
        <Button2 />
        <Paragraph4 />
      </div>
    </div>
  );
}

export default function FilmLot() {
  return (
    <div className="content-stretch flex items-center justify-center relative size-full" data-name="Film Lot 360" style={{ backgroundImage: "linear-gradient(140.074deg, rgb(250, 245, 255) 0%, rgb(255, 255, 255) 50%, rgb(239, 246, 255) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <Container9 />
    </div>
  );
}