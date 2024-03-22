"use server";

export const createPartner = async (formData: FormData) => {
  const nom = (await formData.get("nom")) as string;
  const informations = (await formData.get("informations")) as string;
  const file = (await formData.get("image")) as File;
  console.log(nom, informations, file);
  // await prisma.partner.create({
  //   data: {
  //     nom: nom,
  //     informations: informations,
  //     logo: logo ? logo : "",
  //   },
  // });
  // revalidatePath("/dashboard/partenaires");
  // revalidatePath("/partenaires");
};
