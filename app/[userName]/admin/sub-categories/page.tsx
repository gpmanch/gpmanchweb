import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { getSubCategories } from "@/actions/get-subCategories";


const CategoryPage = async () => {

    const categories = await getSubCategories();

    return (
        <div className="p-6">
            <DataTable columns={columns} data={categories}/>
        </div>
    );
}

export default CategoryPage;