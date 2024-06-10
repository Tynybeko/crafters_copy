'use client';

//styles
import './add-company.css';
import { useCallback, useState } from "react";
import CompanyStage1 from "@/app/(user)/add-company/components/CmpanyStage1";
import CompanyStage2 from "@/app/(user)/add-company/components/CmpanyStage2";
import { Button } from "@/components/ui/button";
import { apiToken } from "@/axios";
import MiniLoading from "@/components/mini-loading/MiniLoading";
import { useRouter } from "next/navigation";
import { CustomAlertDialog } from "@/components/alert-dialog";

const AddCompany = () => {
    const router = useRouter();
    const [isStage, setIsStage] = useState(1);
    const [dataCompany, setDataCompany] = useState({
        legal_name: '',
        phone: '',
        site_url: 'https://',
        city: '',
        index: '',
        legal_address: '',
    });
    const [isCheckedPolicy, setIsCheckedPolicy] = useState(false);
    const [isChecked, setIsChecked] = useState({
        checkedPolicy: false,
        CheckedPersonData: false,
        checkedWebsite: false
    })
    const [isLoading, setIsLoading] = useState(false);
    const handleStage = (stage: any) => setIsStage(stage);
    const [isOpenAlert, setIsOpenAlert] = useState(false)
    const handleChange = useCallback((name: string, value: any) => {
        setDataCompany(prevData => ({ ...prevData, [name]: value }));
    }, [dataCompany]);

    const handleSubmit = (e: any) => {
        setIsLoading(true)
        e.preventDefault()
        apiToken.post('/send-aplication-compancy/', dataCompany, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((res) => {
                setIsOpenAlert(true)
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false)
            })
    }

    return (
        <>
            <CustomAlertDialog
                title={'Company information'}
                open={isOpenAlert}
                close={() => {
                    setIsOpenAlert(false)
                    router.push('/personal-cabinet')
                }} />
            <div className={'add-company'}>
                <div className={'globalContainer'}>
                    <div className={'add-company-wrapper'}>
                        <div className={'add-company-stages'}>
                            <div onClick={() => handleStage(1)}
                                className={isStage === 1 ? 'add-company-stage add-company-stage-active' : 'add-company-stage'}>Company
                                information
                            </div>
                            <div onClick={() => handleStage(2)}
                                className={isStage === 2 ? 'add-company-stage add-company-stage-active' : 'add-company-stage'}>Payment
                                Agreements
                            </div>
                        </div>
                        <div className={'add-company-stages-page'}>
                            {isStage === 1 && <CompanyStage1 handleChange={handleChange} isChecked={isChecked}
                                dataCompany={dataCompany} setIsChecked={setIsChecked}
                                setDataCompany={setDataCompany} />}
                            {isStage === 2 && <CompanyStage2 setIsCheckedPolicy={setIsCheckedPolicy} />}
                        </div>
                        <div className={'add-company-footer'}>
                            <div className={'add-company-checkbox'}>
                                <label className={'add-company-checkbox-wrapper'}>
                                    <input className={isChecked ? "checked" : ""}
                                        onChange={() => setIsChecked(prev => ({
                                            ...prev,
                                            checkedPolicy: !prev.checkedPolicy
                                        }))} type="checkbox"
                                        checked={isChecked.checkedPolicy} hidden />
                                    {isChecked.checkedPolicy ? (
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M4.9987 7.99967L6.9987 9.99967L10.9987 5.99967M14.6654 7.99967C14.6654 11.6816 11.6806 14.6663 7.9987 14.6663C4.3168 14.6663 1.33203 11.6816 1.33203 7.99967C1.33203 4.31778 4.3168 1.33301 7.9987 1.33301C11.6806 1.33301 14.6654 4.31778 14.6654 7.99967Z"
                                                stroke="#1DBE60" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    ) : (
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M7.9987 14.6663C11.6806 14.6663 14.6654 11.6816 14.6654 7.99967C14.6654 4.31778 11.6806 1.33301 7.9987 1.33301C4.3168 1.33301 1.33203 4.31778 1.33203 7.99967C1.33203 11.6816 4.3168 14.6663 7.9987 14.6663Z"
                                                stroke="#262D29" strokeOpacity="0.4" strokeLinecap="round"
                                                strokeLinejoin="round" />
                                        </svg>
                                    )}
                                    <span>Confidentiality policy</span>
                                </label>
                                <label className={'add-company-checkbox-wrapper'}>
                                    <input className={isChecked ? "checked" : ""}
                                        onChange={() => setIsChecked(prev => ({
                                            ...prev,
                                            CheckedPersonData: !prev.CheckedPersonData
                                        }))} type="checkbox"
                                        checked={isChecked.CheckedPersonData} hidden />
                                    {isChecked.CheckedPersonData ? (
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M4.9987 7.99967L6.9987 9.99967L10.9987 5.99967M14.6654 7.99967C14.6654 11.6816 11.6806 14.6663 7.9987 14.6663C4.3168 14.6663 1.33203 11.6816 1.33203 7.99967C1.33203 4.31778 4.3168 1.33301 7.9987 1.33301C11.6806 1.33301 14.6654 4.31778 14.6654 7.99967Z"
                                                stroke="#1DBE60" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    ) : (
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M7.9987 14.6663C11.6806 14.6663 14.6654 11.6816 14.6654 7.99967C14.6654 4.31778 11.6806 1.33301 7.9987 1.33301C4.3168 1.33301 1.33203 4.31778 1.33203 7.99967C1.33203 11.6816 4.3168 14.6663 7.9987 14.6663Z"
                                                stroke="#262D29" strokeOpacity="0.4" strokeLinecap="round"
                                                strokeLinejoin="round" />
                                        </svg>
                                    )}
                                    <span>By filling in the form, I agree to the processing of personal data</span>
                                </label>
                            </div>
                            {isStage === 1 ? (
                                <Button onClick={() => setIsStage(2)}
                                    disabled={!isChecked.CheckedPersonData || !isChecked.checkedPolicy}
                                    className={'add-company-footer-btn'}>Continued</Button>
                            ) : (
                                <Button onClick={handleSubmit}
                                    disabled={!isChecked.CheckedPersonData || !isChecked.checkedPolicy || !isCheckedPolicy}
                                    className={'add-company-footer-btn'}>
                                    {isLoading ? <MiniLoading /> : 'Apply'}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddCompany;
