    import Image from "next/image";
    
    const Avatar = () => {
        return (
            <Image 
             src={"/avatar.png"}
             alt="avatar"
             width={100}
             height={100}
            />
        );
    }

    export default Avatar;