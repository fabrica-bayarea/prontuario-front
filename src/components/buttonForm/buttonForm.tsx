import Link from "next/link";
import styles from "./style.module.css";

const ButtonForm = ({ variant, href, children, ...props }: any) => {

    let buttonClassName = styles.flatButton;

    if (variant === "outline") {
        buttonClassName = styles.outlineButton;
    }

    return (
            <button className={buttonClassName} {...props} href={href}>
                {children}
            </button>
    );
};

export default ButtonForm;
