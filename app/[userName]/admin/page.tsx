const AdminLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {

    // if (!isAdmin(userId)) {
    //     return redirect("/home");
    // }

    return <>{children}</>
}

export default AdminLayout;