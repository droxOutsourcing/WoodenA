import { 
  users, 
  blogCategories, 
  blogPosts, 
  blogComments,
  type User, 
  type InsertUser,
  type BlogCategory,
  type InsertBlogCategory,
  type BlogPost,
  type InsertBlogPost,
  type BlogComment,
  type InsertBlogComment
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, like, sql } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Blog category methods
  getBlogCategories(): Promise<BlogCategory[]>;
  getBlogCategory(id: number): Promise<BlogCategory | undefined>;
  getBlogCategoryBySlug(slug: string): Promise<BlogCategory | undefined>;
  createBlogCategory(category: InsertBlogCategory): Promise<BlogCategory>;
  
  // Blog post methods
  getBlogPosts(filters?: {
    categoryId?: number;
    status?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost & { authorId: number }): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  
  // Blog comment methods
  getBlogComments(postId: number): Promise<BlogComment[]>;
  createBlogComment(comment: InsertBlogComment): Promise<BlogComment>;
  updateCommentStatus(id: number, status: string): Promise<BlogComment | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Blog category methods
  async getBlogCategories(): Promise<BlogCategory[]> {
    return await db.select().from(blogCategories).orderBy(blogCategories.name);
  }

  async getBlogCategory(id: number): Promise<BlogCategory | undefined> {
    const [category] = await db.select().from(blogCategories).where(eq(blogCategories.id, id));
    return category || undefined;
  }

  async getBlogCategoryBySlug(slug: string): Promise<BlogCategory | undefined> {
    const [category] = await db.select().from(blogCategories).where(eq(blogCategories.slug, slug));
    return category || undefined;
  }

  async createBlogCategory(category: InsertBlogCategory): Promise<BlogCategory> {
    const [newCategory] = await db
      .insert(blogCategories)
      .values(category)
      .returning();
    return newCategory;
  }

  // Blog post methods
  async getBlogPosts(filters?: {
    categoryId?: number;
    status?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<BlogPost[]> {
    const conditions = [];
    
    if (filters?.categoryId) {
      conditions.push(eq(blogPosts.categoryId, filters.categoryId));
    }
    
    if (filters?.status) {
      conditions.push(eq(blogPosts.status, filters.status));
    } else {
      conditions.push(eq(blogPosts.status, 'published'));
    }
    
    if (filters?.search) {
      conditions.push(
        sql`(${blogPosts.title} ILIKE ${'%' + filters.search + '%'} OR ${blogPosts.excerpt} ILIKE ${'%' + filters.search + '%'})`
      );
    }
    
    const baseQuery = db.select().from(blogPosts);
    
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
    const orderBy = desc(blogPosts.publishedAt);
    
    if (whereClause) {
      if (filters?.limit && filters?.offset) {
        return await baseQuery.where(whereClause).orderBy(orderBy).limit(filters.limit).offset(filters.offset);
      } else if (filters?.limit) {
        return await baseQuery.where(whereClause).orderBy(orderBy).limit(filters.limit);
      } else if (filters?.offset) {
        return await baseQuery.where(whereClause).orderBy(orderBy).offset(filters.offset);
      } else {
        return await baseQuery.where(whereClause).orderBy(orderBy);
      }
    } else {
      if (filters?.limit && filters?.offset) {
        return await baseQuery.orderBy(orderBy).limit(filters.limit).offset(filters.offset);
      } else if (filters?.limit) {
        return await baseQuery.orderBy(orderBy).limit(filters.limit);
      } else if (filters?.offset) {
        return await baseQuery.orderBy(orderBy).offset(filters.offset);
      } else {
        return await baseQuery.orderBy(orderBy);
      }
    }
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async createBlogPost(post: InsertBlogPost & { authorId: number }): Promise<BlogPost> {
    const [newPost] = await db
      .insert(blogPosts)
      .values({
        ...post,
        publishedAt: post.status === 'published' ? new Date() : null,
      })
      .returning();
    return newPost;
  }

  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [updatedPost] = await db
      .update(blogPosts)
      .set({
        ...post,
        updatedAt: new Date(),
        publishedAt: post.status === 'published' ? new Date() : undefined,
      })
      .where(eq(blogPosts.id, id))
      .returning();
    return updatedPost || undefined;
  }

  // Blog comment methods
  async getBlogComments(postId: number): Promise<BlogComment[]> {
    return await db.select()
      .from(blogComments)
      .where(and(
        eq(blogComments.postId, postId),
        eq(blogComments.status, 'approved')
      ))
      .orderBy(desc(blogComments.createdAt));
  }

  async createBlogComment(comment: InsertBlogComment): Promise<BlogComment> {
    const [newComment] = await db
      .insert(blogComments)
      .values(comment)
      .returning();
    return newComment;
  }

  async updateCommentStatus(id: number, status: string): Promise<BlogComment | undefined> {
    const [updatedComment] = await db
      .update(blogComments)
      .set({ status })
      .where(eq(blogComments.id, id))
      .returning();
    return updatedComment || undefined;
  }
}

export const storage = new DatabaseStorage();
