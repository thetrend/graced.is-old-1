import { gql } from '@apollo/client';

export const hgPublicAPI = import.meta.env.VITE_HYGRAPH_URL;

export const pageQuery = gql`query getPageBySlug($slug: String!) {
  pages(where: {slug: $slug}) {
    id
    slug
    title
    content {
      raw
    }
  }
}`;