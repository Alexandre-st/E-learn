export default function supabaseLoader({ src, width, quality }) {
    return `https://usamkqtvaqvkhsfahlqq.supabase.co/storage/v1/object/public/cours_images/${src}?width=${width || 300}&quality=${quality || 75}`
}
