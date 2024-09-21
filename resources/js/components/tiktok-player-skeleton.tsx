'use client'

import { Skeleton } from "@/components/ui/skeleton"
import { Heart, MessageCircle, Share2, Music, User } from "lucide-react"

export function TiktokPlayerSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto h-[80vh] bg-black relative overflow-hidden">
      {/* Video container */}
      <Skeleton className="absolute inset-0 w-full h-full" />
      hhhhhhhhhhhhhh

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        {/* Top section - User info */}
        <div className="flex items-center space-x-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-4 w-24 mb-1" />
            <Skeleton className="h-3 w-32" />
          </div>
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>

        {/* Bottom section - Caption and actions */}
        <div className="space-y-4">
          {/* Caption */}
          <div className="space-y-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          {/* Music info */}
          <div className="flex items-center space-x-2">
            <Music className="h-4 w-4 text-white" />
            <Skeleton className="h-4 w-40" />
          </div>

          {/* Action buttons */}
          <div className="flex flex-col items-center space-y-4 absolute right-4 bottom-20">
            <Skeleton className="h-12 w-12 rounded-full">
              <Heart className="h-6 w-6 text-white" />
            </Skeleton>
            <Skeleton className="h-12 w-12 rounded-full">
              <MessageCircle className="h-6 w-6 text-white" />
            </Skeleton>
            <Skeleton className="h-12 w-12 rounded-full">
              <Share2 className="h-6 w-6 text-white" />
            </Skeleton>
            <Skeleton className="h-12 w-12 rounded-full">
              <User className="h-6 w-6 text-white" />
            </Skeleton>
          </div>
        </div>
      </div>
    </div>
  )
}