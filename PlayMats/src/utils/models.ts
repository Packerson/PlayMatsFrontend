export interface Mat {
  id: number,
  name: string,
  image: string,
  description: string,
  price: number,
  availableSizes?: string[],
  availability?: number,
  image1?: string,
  image2?: string,
  image3?: string,
}

export interface EmailForm {
  name: string,
  email: string,
  message: string
}

