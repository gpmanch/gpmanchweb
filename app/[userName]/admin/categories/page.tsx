import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { getCategories } from "@/actions/get-categories";


const CategoryPage = async () => {

    const categories = await getCategories();

    return (
        <div className="p-6">
            <DataTable columns={columns} data={categories}/>
        </div>
    );
}

export default CategoryPage;